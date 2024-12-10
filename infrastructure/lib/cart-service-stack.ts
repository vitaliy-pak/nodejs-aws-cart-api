import * as cdk from 'aws-cdk-lib';
import { Duration, SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from 'path';
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import {
    InstanceClass,
    InstanceSize,
    InstanceType,
    Peer,
    Port,
    SecurityGroup,
    SubnetType,
    Vpc
} from "aws-cdk-lib/aws-ec2";
import { Credentials, DatabaseInstance, DatabaseInstanceEngine, StorageType } from "aws-cdk-lib/aws-rds";
import * as dotenv from 'dotenv';

dotenv.config();

export class CartServiceStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        if (!process.env.DB_NAME || !process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
            throw new Error('Missing db env variables');
        }

        if (!process.env.AWS_PROFILE) {
            throw new Error('Missing aws profile env variable');
        }

        const dbUsername = process.env.DB_USERNAME.trim();
        const dbName = process.env.DB_NAME.trim();
        const dbPassword = process.env.DB_PASSWORD.trim();

        const vpc = new Vpc(this, 'CartServiceVPC', {
            maxAzs: 2,
            natGateways: 0,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'PublicSubnet',
                    subnetType: SubnetType.PUBLIC
                }
            ]
        });

        const rdsSecurityGroup = new SecurityGroup(this, 'RDSSecurityGroup', {
            vpc,
            description: 'Allow access to RDS instance',
            allowAllOutbound: true,
        });

        rdsSecurityGroup.addIngressRule(
            Peer.anyIpv4(),
            Port.tcp(5432),
            'Allow inbound PostgreSQL access from any IP'
        );
        const dbInstance = new DatabaseInstance(this, 'PostgresDB', {
            engine: DatabaseInstanceEngine.POSTGRES,
            instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
            vpc,
            vpcSubnets: {
                subnetType: SubnetType.PUBLIC,
            },
            multiAz: false,
            allocatedStorage: 20,
            storageType: StorageType.GP2,
            databaseName: dbName,
            credentials: Credentials.fromPassword(dbUsername, SecretValue.unsafePlainText(dbPassword)),
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            deletionProtection: false,
            securityGroups: [rdsSecurityGroup],
            iamAuthentication: false
        });

        const nestJsFunction = new Function(this, 'NestJSFunction', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'index.handler',
            code: Code.fromAsset(path.join(__dirname, '../../dist')),
            timeout: Duration.seconds(30),
            environment: {
                DB_HOST: dbInstance.dbInstanceEndpointAddress,
                DB_PORT: dbInstance.dbInstanceEndpointPort,
                DB_NAME: dbName,
                DB_USERNAME: dbUsername,
                DB_PASSWORD: dbPassword
            },
        });

        const api = new RestApi(this, 'CartServiceApi', {
            restApiName: 'Cart Service API',
            description: 'This service serves a Nest.js application with cart processing logic.',
        });

        const lambdaIntegration = new LambdaIntegration(nestJsFunction);

        api.root.addProxy({defaultIntegration: lambdaIntegration});
    }
}
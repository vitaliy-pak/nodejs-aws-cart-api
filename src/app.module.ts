import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "./cart/cart.module";
import { Cart } from "./cart/entities/cart.entity";
import { CartItem } from "./cart/entities/cart-item.entity";
import { Order } from "./order/entities/order.entity";

@Module({
    imports: [
        AuthModule,
        CartModule,
        OrderModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get<string>('DB_HOST'),
                    port: configService.get<number>('DB_PORT'),
                    username: configService.get<string>('DB_USERNAME'),
                    password: configService.get<string>('DB_PASSWORD'),
                    database: configService.get<string>('DB_NAME'),
                    ssl: {rejectUnauthorized: false},
                    synchronize: true,
                    entities: [Cart, CartItem, Order],
                    logging: true
                }
            },
        }),
    ],
    controllers: [
        AppController,
    ],
    providers: [],
})
export class AppModule {
}

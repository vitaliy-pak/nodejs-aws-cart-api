const esbuild = require('esbuild');
const path = require('path');
const { esbuildDecorators } = require('esbuild-plugin-typescript-decorators');

esbuild.build({
    entryPoints: [path.join(__dirname, 'src/lambda.ts')],
    bundle: true,
    platform: 'node',
    target: 'node20',
    outfile: path.join(__dirname, 'dist/index.js'),
    plugins: [
        esbuildDecorators(),
    ],
    external: [
        'aws-sdk',
        '@nestjs/websockets',
        '@nestjs/microservices',
    ],
    sourcemap: false,
}).catch(() => process.exit(1));
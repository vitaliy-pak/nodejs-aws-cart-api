const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
    entryPoints: [path.join(__dirname, 'src/main.ts')],
    bundle: true,
    platform: 'node',
    target: 'node20',
    outfile: path.join(__dirname, 'dist/index.js'),
    external: [
        'aws-sdk',
        '@nestjs/websockets',
        '@nestjs/microservices',
    ],
    sourcemap: false,
}).catch(() => process.exit(1));
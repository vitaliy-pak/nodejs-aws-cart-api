import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { JWT_CONFIG } from '../constants';
import { UsersModule } from '../users/users.module';
import { BasicStrategy } from "./strategies/basic.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

const { secret, expiresIn } = JWT_CONFIG;

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'basic' }),
    JwtModule.register({ secret, signOptions: { expiresIn } }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    BasicStrategy,
  ],
  exports: [ AuthService ],
})
export class AuthModule {}

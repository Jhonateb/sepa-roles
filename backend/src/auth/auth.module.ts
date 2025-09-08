// src/auth/auth.module.ts (Correcto)

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module'; 
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
// --- 1. Importa el CaslModule ---
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    UsersModule, 
    // --- 2. Añádelo aquí ---
    CaslModule,
    JwtModule.register({
      global: true, 
      secret: 'MI_PALABRA_SECRETA_123', 
      signOptions: { expiresIn: '60m' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], 
  exports: [AuthService],
})
export class AuthModule {}
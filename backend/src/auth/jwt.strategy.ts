// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MI_PALABRA_SECRETA_123', 
    });
  }

  // --- REEMPLAZA EL MÉTODO VALIDATE CON ESTO ---
  async validate(payload: any) {
    // payload.sub contiene el ID del usuario que guardamos en el token
    const user = await this.usersService.findOneById(payload.sub);

    if (!user) {
      // Si el usuario del token ya no existe, rechaza la petición
      throw new UnauthorizedException();
    }

    // Si el usuario existe, PassportJS adjuntará la entidad completa
    // a `request.user` en cada petición protegida.
    return user;
  }
}
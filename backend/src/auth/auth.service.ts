// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// --- 1. Importa la fábrica de CASL ---
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    // --- 2. Inyéctala en el constructor ---
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // --- 3. Calcula los permisos del usuario ---
    const ability = this.caslAbilityFactory.createForUser(user);
    const permissions = ability.rules;

    // --- 4. Crea el payload con TODO lo que el frontend necesita ---
    const payload = { 
      sub: user.id, 
      nombre: user.nombre, // <-- Añade el nombre
      email: user.email, 
      permissions: permissions, // <-- ¡Añade los permisos!
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
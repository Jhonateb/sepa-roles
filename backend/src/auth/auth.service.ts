
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const ability = this.caslAbilityFactory.createForUser(user);
    const permissions = ability.rules;

    const payload = { 
      sub: user.id, 
      nombre: user.nombre, 
      email: user.email, 
      permissions: permissions, 
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
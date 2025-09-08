import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcrypt'; // <-- 1. Asegúrate de que bcrypt esté importado

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async onModuleInit() {
    console.log('🌱 Ejecutando seeder...');
    await this.seed();
  }

  async seed() {
    // --- 1. Sembrar Roles ---
    const rolesToCreate = ['admin', 'editor', 'viewer', 'creator', 'creator_deleter'];
    for (const roleName of rolesToCreate) {
      const roleExists = await this.roleRepository.findOne({ where: { name: roleName } });
      if (!roleExists) {
        const newRole = this.roleRepository.create({ name: roleName });
        await this.roleRepository.save(newRole);
        console.log(`Rol "${roleName}" creado.`);
      }
    }

    // --- 2. Sembrar Usuarios ---
    const roles = await this.roleRepository.find();
    const usersToCreate = [
      {
        nombre: 'Admin User',
        email: 'admin@tours.com',
        password: 'admin',
        roleName: 'admin',
      },
      {
        nombre: 'Viewer User',
        email: 'viewer@tours.com',
        password: 'password123',
        roleName: 'viewer',
      },
      {
        nombre: 'Creator User',
        email: 'creator@tours.com',
        password: 'password123',
        roleName: 'creator',
      },
      {
        nombre: 'Creator Deleter User',
        email: 'creatordelete@tours.com',
        password: 'password123',
        roleName: 'creator_deleter',
      },
    ];

    for (const userData of usersToCreate) {
      const userExists = await this.userRepository.findOne({ where: { email: userData.email } });
      if (!userExists) {
        const role = roles.find(r => r.name === userData.roleName);
        if (role) {

          const user = this.userRepository.create({
            nombre: userData.nombre,
            email: userData.email,
            password: userData.password, // Le pasas la contraseña en texto plano
            roles: [role],
          });
          await this.userRepository.save(user);
          console.log(`✅ Usuario "${userData.nombre}" creado con contraseña encriptada.`);
        }
      }
    }
  }
}
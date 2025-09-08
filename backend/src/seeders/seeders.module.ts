import { Module } from '@nestjs/common';
import { SeederService } from './seeders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  // Importamos TypeOrmModule para poder inyectar los repositorios
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [SeederService],
})
export class SeedersModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { ToursModule } from './tours/tours.module';
import { SeedersModule } from './seeders/seeders.module';
import { Tour } from './tours/entities/tour.entity';

@Module({
  imports: [
    // --- INICIA LA CONFIGURACIÓN ---
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o la IP de tu servidor de BD
      port: 5432,
      username: 'postgres', // tu usuario de postgres
      password: 'admin', // tu contraseña de postgres
      database: 'tours_db', // el nombre de tu base de datos
      entities: [User, Role, Tour], // ¡Importante! Registra nuestras entidades
      synchronize: true, // Sincroniza el esquema de la BD (Solo para desarrollo)
    }),
    // --- TERMINA LA CONFIGURACIÓN ---
    UsersModule,
    RolesModule,
    AuthModule,
    CaslModule,
    ToursModule,
    SeedersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility, PureAbility } from '@casl/ability';
import { User } from '../users/entities/user.entity';
import { Tour } from '../tours/entities/tour.entity'; // <-- Marcará error por ahora

// Define las acciones que un usuario puede realizar
export enum Action {
  Manage = 'manage', // Comodín para cualquier acción (crear, leer, actualizar, borrar)
  Create = 'create',
  Read   = 'read',
  Update = 'update',
  Delete = 'delete',
}

// Define los "sujetos" o entidades sobre los que se pueden realizar acciones
export type Subjects = typeof Tour | typeof User | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    // Rol de Admin (sin cambios)
    if (user.roles.some((role) => role.name === 'admin')) {
      can(Action.Manage, 'all');
    }

    // Rol de Editor (sin cambios)
    if (user.roles.some((role) => role.name === 'editor')) {
      can(Action.Create, Tour);
      can(Action.Read, Tour);
      can(Action.Update, Tour);
    }
    
    // --- INICIO DE NUEVOS ROLES ---

    // Rol "Lector" (solo puede ver)
    if (user.roles.some((role) => role.name === 'viewer')) {
      can(Action.Read, Tour);
    }

    // Rol "Creador" (puede ver y crear)
    if (user.roles.some((role) => role.name === 'creator')) {
      can(Action.Read, Tour);
      can(Action.Create, Tour);
    }

    // Rol "Creador y Eliminador" (puede ver, crear y eliminar)
    if (user.roles.some((role) => role.name === 'creator_deleter')) {
      can(Action.Read, Tour);
      can(Action.Create, Tour);
      can(Action.Delete, Tour);
    }
    
    // --- FIN DE NUEVOS ROLES ---

    return build();
  }
}
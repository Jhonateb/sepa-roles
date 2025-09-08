import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility, PureAbility } from '@casl/ability';
import { User } from '../users/entities/user.entity';
import { Tour } from '../tours/entities/tour.entity'; 

export enum Action {
  Manage = 'manage', 
  Create = 'create',
  Read   = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = typeof Tour | typeof User | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.roles.some((role) => role.name === 'admin')) {
      can(Action.Manage, 'all');
    }

    if (user.roles.some((role) => role.name === 'editor')) {
      can(Action.Create, Tour);
      can(Action.Read, Tour);
      can(Action.Update, Tour);
    }
    

    if (user.roles.some((role) => role.name === 'viewer')) {
      can(Action.Read, Tour);
    }

    if (user.roles.some((role) => role.name === 'creator')) {
      can(Action.Read, Tour);
      can(Action.Create, Tour);
    }

    if (user.roles.some((role) => role.name === 'creator_deleter')) {
      can(Action.Read, Tour);
      can(Action.Create, Tour);
      can(Action.Delete, Tour);
    }
    
    
    return build();
  }
}
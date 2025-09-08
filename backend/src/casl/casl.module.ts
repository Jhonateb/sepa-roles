import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  providers: [CaslAbilityFactory], // <-- 1. Registra la fábrica como un proveedor
  exports: [CaslAbilityFactory],   // <-- 2. Exporta la fábrica para que otros módulos la usen
})
export class CaslModule {}
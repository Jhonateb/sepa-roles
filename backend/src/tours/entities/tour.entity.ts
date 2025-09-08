// 1. El import va aquí arriba
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 2. La clase se define una sola vez
@Entity({ name: 'tours' })
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  destino: string;

  @Column('text')
  descripcion: string;

  @Column('decimal')
  precio: number;

  @Column('date')
  fecha_inicio: Date;
}
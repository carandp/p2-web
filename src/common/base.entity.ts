import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;
}
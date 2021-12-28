import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  from: number;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  to: number;
  @Column()
  text: string;
}

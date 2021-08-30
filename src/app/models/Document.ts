import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import User from './User';

@Entity('documents')
class Document {
  @PrimaryColumn()
  key: string;

  @Column()
  url: string;

  @Column()
  size: Number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.documents)
  user: User;

  @CreateDateColumn()
  created_at: Date;
}

export default Document;

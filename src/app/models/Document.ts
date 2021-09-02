import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
  BeforeInsert,
  AfterRemove,
  BeforeRemove,
} from 'typeorm';

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

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

  @BeforeInsert()
  setUrl() {
    if (!this.url) {
      this.url = `${process.env.APP_URL}/files/${this.key}`
    }
  };

  @BeforeRemove()
  deleteLocalUpload() {
    const pathUrl = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key);
    console.log(pathUrl);
    return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', this.key))
  }
}




export default Document;

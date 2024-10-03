// src/models/users.model.ts
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Contacts } from './contacts.model';
import { Messages } from './messages.model';

@Table({ tableName: 'users' })
export class Users extends Model<Users> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  user_id: number;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(100),
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @HasMany(() => Contacts)
  contacts: Contacts[];

  @HasMany(() => Messages)
  messages: Messages[];
}
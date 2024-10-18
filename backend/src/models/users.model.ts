import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  HasMany,
} from 'sequelize-typescript';
import { UsersChats } from './users_chats.model';
import { Message } from './messages.model';
import { Contact } from './contacts.model';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  user_id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  password: string;

  @Unique
  @Column({ type: DataType.STRING(50), allowNull: false })
  username: string;

  @Unique
  @Column({ type: DataType.STRING(100), allowNull: false })
  email: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  created_at: Date;

  @HasMany(() => UsersChats)
  chats: UsersChats[];

  @HasMany(() => Message)
  messages: Message[];

  @HasMany(() => Contact)
  contacts: Contact[];
}
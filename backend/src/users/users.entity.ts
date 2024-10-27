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
import { Message } from '../messages/messages.entity';
import { Contact } from '../contacts/contacts.entity';
import { UsersChats } from 'src/users_chats/users_chats.entity';

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

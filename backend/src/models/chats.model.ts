import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  HasMany,
} from 'sequelize-typescript';
import { UsersChats } from './users_chats.model';
import { Message } from './messages.model';

@Table({ tableName: 'chats', timestamps: false })
export class Chat extends Model<Chat> {
  @PrimaryKey
  @AutoIncrement
  @Column
  chat_id: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  chat_name: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  created_at: Date;

  @HasMany(() => UsersChats)
  usersChats: UsersChats[];

  @HasMany(() => Message)
  messages: Message[];
}

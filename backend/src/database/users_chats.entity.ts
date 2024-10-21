import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  CreatedAt,
} from 'sequelize-typescript';
import { User } from '../users/users.entity';
import { Chat } from '../chats/chats.entity';

@Table({ tableName: 'users_chats', timestamps: false })
export class UsersChats extends Model<UsersChats> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER, allowNull: false })
  chat_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @CreatedAt
  @Column({ type: DataType.DATE })
  entered_at: Date;
}

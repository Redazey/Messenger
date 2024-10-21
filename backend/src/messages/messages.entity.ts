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

@Table({ tableName: 'messages', timestamps: false })
export class Message extends Model<Message> {
  @PrimaryKey
  @AutoIncrement
  @Column
  message_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER, allowNull: true })
  chat_id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  message_text: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  deleted: boolean;

  @CreatedAt
  @Column({ type: DataType.DATE })
  sent_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  edit_at: Date;
}

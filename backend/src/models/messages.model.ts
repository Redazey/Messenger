// src/models/messages.model.ts
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Users } from './users.model';
import { Chats } from './chats.model';

@Table({ tableName: 'messages' })
export class Messages extends Model<Messages> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  message_id: number;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sender_id: number;

  @ForeignKey(() => Chats)
  @Column({
    type: DataType.INTEGER,
    allowNull: true, // может быть NULL, если сообщение не в чате
  })
  chat_id: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['user', 'chat']],
    },
  })
  contact_type: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message_text: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  sent_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  edit_at: Date;
}
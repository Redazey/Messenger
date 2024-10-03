// src/models/chats.model.ts
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Messages } from './messages.model';

@Table({ tableName: 'chats' })
export class Chats extends Model<Chats> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  chat_id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  chat_name: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @HasMany(() => Messages)
  messages: Messages[];
}
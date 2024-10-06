// src/models/contacts.model.ts
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Users } from './users.model';
import { Chats } from './chats.model';

@Table({ tableName: 'contacts' })
export class Contacts extends Model<Contacts> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  contact_id: number;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['user', 'chat']],
    },
  })
  contact_type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  friend_id: number;
}
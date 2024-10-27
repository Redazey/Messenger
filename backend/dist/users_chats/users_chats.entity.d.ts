import { Model } from 'sequelize-typescript';
export declare class UsersChats extends Model<UsersChats> {
    id: number;
    chat_id: number;
    user_id: number;
    entered_at: Date;
}

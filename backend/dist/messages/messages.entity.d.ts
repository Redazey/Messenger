import { Model } from 'sequelize-typescript';
export declare class Message extends Model<Message> {
    message_id: number;
    user_id: number;
    chat_id: number;
    message_text: string;
    deleted: boolean;
    sent_at: Date;
    edit_at: Date;
}

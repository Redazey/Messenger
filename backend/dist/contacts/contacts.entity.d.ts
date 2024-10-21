import { Model } from 'sequelize-typescript';
export declare class Contact extends Model<Contact> {
    id: number;
    user_id: number;
    contact_id: number;
}

import { Model } from 'sequelize-typescript';
import { User } from '../users/users.entity';
export declare class Contact extends Model<Contact> {
    id: number;
    user_id: number;
    contact_id: number;
    contact: User;
}

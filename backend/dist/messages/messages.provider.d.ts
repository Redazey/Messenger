import { Message } from './messages.entity';
export declare const chatProviders: {
    provide: string;
    useValue: typeof Message;
}[];

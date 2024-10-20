"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatProviders = void 0;
const users_chats_entity_1 = require("./users_chats.entity");
exports.chatProviders = [
    {
        provide: 'USERS_CHATS_REPOSITORY',
        useValue: users_chats_entity_1.UsersChats,
    },
];
//# sourceMappingURL=users_chats.provider.js.map
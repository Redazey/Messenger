"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users_chatsProviders = void 0;
const users_chats_entity_1 = require("./users_chats.entity");
exports.users_chatsProviders = [
    {
        provide: 'USERS_CHATS_REPOSITORY',
        useValue: users_chats_entity_1.UsersChats,
    },
];
//# sourceMappingURL=users_chats.provider.js.map
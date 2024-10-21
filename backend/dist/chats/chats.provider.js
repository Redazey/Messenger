"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatProviders = void 0;
const chats_entity_1 = require("./chats.entity");
exports.chatProviders = [
    {
        provide: 'CHATS_REPOSITORY',
        useValue: chats_entity_1.Chat,
    },
];
//# sourceMappingURL=chats.provider.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatProviders = void 0;
const messages_entity_1 = require("./messages.entity");
exports.chatProviders = [
    {
        provide: 'MESSAGE_REPOSITORY',
        useValue: messages_entity_1.Message,
    },
];
//# sourceMappingURL=messages.provider.js.map
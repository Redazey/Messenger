"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageProviders = void 0;
const messages_entity_1 = require("./messages.entity");
exports.messageProviders = [
    {
        provide: 'MESSAGE_REPOSITORY',
        useValue: messages_entity_1.Message,
    },
];
//# sourceMappingURL=messages.provider.js.map
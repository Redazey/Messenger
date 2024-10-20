"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProviders = void 0;
const users_entity_1 = require("./users.entity");
exports.userProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useValue: users_entity_1.User,
    },
];
//# sourceMappingURL=users.provider.js.map
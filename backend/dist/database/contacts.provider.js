"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactProvider = void 0;
const contacts_entity_1 = require("./contacts.entity");
exports.contactProvider = [
    {
        provide: 'CONTACT_REPOSITORY',
        useValue: contacts_entity_1.Contact,
    },
];
//# sourceMappingURL=contacts.provider.js.map
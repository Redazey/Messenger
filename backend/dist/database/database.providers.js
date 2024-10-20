"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const constants_1 = require("./constants");
const users_chats_entity_1 = require("./users_chats.entity");
const contacts_entity_1 = require("./contacts.entity");
const messages_entity_1 = require("./messages.entity");
const users_entity_1 = require("../users/users.entity");
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize(constants_1.dbConfig.development.database, constants_1.dbConfig.development.username, constants_1.dbConfig.development.password, {
                host: constants_1.dbConfig.development.host,
                dialect: constants_1.dbConfig.development.dialect,
            });
            sequelize.addModels([users_chats_entity_1.UsersChats, users_chats_entity_1.UsersChats, contacts_entity_1.Contact, messages_entity_1.Message, users_entity_1.User]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map
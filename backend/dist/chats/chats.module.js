"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsModule = void 0;
const common_1 = require("@nestjs/common");
const chats_service_1 = require("./chats.service");
const chats_controller_1 = require("./chats.controller");
const database_module_1 = require("../database/database.module");
const chats_entity_1 = require("./chats.entity");
const users_chats_entity_1 = require("../users_chats/users_chats.entity");
let ChatsModule = class ChatsModule {
};
exports.ChatsModule = ChatsModule;
exports.ChatsModule = ChatsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [
            chats_service_1.ChatsService,
            {
                provide: 'CHATS_REPOSITORY',
                useValue: chats_entity_1.Chat,
            },
            {
                provide: 'USERS_CHATS_REPOSITORY',
                useValue: users_chats_entity_1.UsersChats,
            },
        ],
        exports: [chats_service_1.ChatsService],
        controllers: [chats_controller_1.ChatsController],
    })
], ChatsModule);
//# sourceMappingURL=chats.module.js.map
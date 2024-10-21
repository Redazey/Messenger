"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const contacts_controller_1 = require("./contacts/contacts.controller");
const contacts_module_1 = require("./contacts/contacts.module");
const messages_module_1 = require("./messages/messages.module");
const chats_controller_1 = require("./chats/chats.controller");
const chats_module_1 = require("./chats/chats.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, contacts_module_1.ContactsModule, messages_module_1.MessagesModule, chats_module_1.ChatsModule],
        controllers: [contacts_controller_1.ContactsController, chats_controller_1.ChatsController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsController = void 0;
const common_1 = require("@nestjs/common");
const chats_service_1 = require("../chats/chats.service");
const contacts_service_1 = require("./contacts.service");
const newcontact_dto_1 = require("./newcontact.dto");
let ContactsController = class ContactsController {
    constructor(chatsService, contactsService) {
        this.chatsService = chatsService;
        this.contactsService = contactsService;
    }
    signIn(newContactDto) {
        this.contactsService.create({
            user_id: newContactDto.user_id,
            contact_id: newContactDto.contact_id,
        });
        return this.chatsService.create({
            name: newContactDto.chatname,
            user_id: [newContactDto.user_id, newContactDto.contact_id],
        });
    }
};
exports.ContactsController = ContactsController;
__decorate([
    (0, common_1.Post)('newContact'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newcontact_dto_1.NewContactDto]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "signIn", null);
exports.ContactsController = ContactsController = __decorate([
    (0, common_1.Controller)('contacts'),
    __metadata("design:paramtypes", [chats_service_1.ChatsService,
        contacts_service_1.ContactsService])
], ContactsController);
//# sourceMappingURL=contacts.controller.js.map
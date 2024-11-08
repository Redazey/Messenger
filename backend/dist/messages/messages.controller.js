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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const messages_dto_1 = require("./messages.dto");
const messages_service_1 = require("./messages.service");
const rxjs_1 = require("rxjs");
let MessagesController = class MessagesController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    sendMessage(sendMessageDto) {
        return this.messageService.create(sendMessageDto);
    }
    editMessage(sendMessageDto) {
        return this.messageService.edit(sendMessageDto);
    }
    deleteMessage(message_id) {
        return this.messageService.delete(message_id);
    }
    getMessages(chat_id) {
        return this.messageService.findAll(chat_id);
    }
    getSSEMessages(chat_id) {
        const subject = new rxjs_1.Subject();
        this.messageService.subscribeToChat(chat_id.toString(), subject);
        return subject.asObservable();
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messages_dto_1.CreateMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('edit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messages_dto_1.EditMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "editMessage", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "deleteMessage", null);
__decorate([
    (0, common_1.Get)('get/:chat_id'),
    __param(0, (0, common_1.Param)('chat_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Sse)('getSSE/:chat_id'),
    __param(0, (0, common_1.Param)('chat_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], MessagesController.prototype, "getSSEMessages", null);
exports.MessagesController = MessagesController = __decorate([
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map
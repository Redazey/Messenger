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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const events_1 = require("events");
let MessagesService = class MessagesService {
    constructor(messages) {
        this.messages = messages;
        this.ee = new events_1.EventEmitter();
        this.chatSubscribers = {};
    }
    async findAll(chat_id) {
        return await this.messages.findAll({
            where: {
                chat_id: chat_id,
            },
        });
    }
    async edit(editMessageDto) {
        await this.messages.update({
            message_text: editMessageDto.message_text,
        }, {
            where: {
                message_id: editMessageDto.message_id,
            },
        });
    }
    async delete(message_id) {
        await this.messages.destroy({
            where: {
                message_id: message_id,
            },
        });
    }
    subscribeToChat(chat_id, subscriber) {
        if (!this.chatSubscribers[chat_id]) {
            this.chatSubscribers[chat_id] = new Set();
        }
        this.chatSubscribers[chat_id].add(subscriber);
        const handler = (messages) => {
            subscriber.next(messages);
        };
        this.ee.on(chat_id, handler);
    }
    async create(createMessageDto) {
        createMessageDto.deleted = false;
        const message = await this.messages.create(createMessageDto);
        const messages = await this.findAll(createMessageDto.chat_id);
        this.ee.emit(createMessageDto.chat_id.toString(), messages);
        return message;
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MESSAGES_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], MessagesService);
//# sourceMappingURL=messages.service.js.map
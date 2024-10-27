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
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const users_chats_entity_1 = require("../users_chats/users_chats.entity");
let ChatsService = class ChatsService {
    constructor(chat, users_chats) {
        this.chat = chat;
        this.users_chats = users_chats;
    }
    async findAll(user_id) {
        const userChats = await this.chat.findAll({
            include: [
                {
                    model: users_chats_entity_1.UsersChats,
                    attributes: ['user_id', 'chat_id', 'entered_at'],
                    where: {
                        user_id: user_id,
                    },
                },
            ],
        });
        if (!userChats || userChats.length === 0) {
            return undefined;
        }
        return userChats;
    }
    async create(credentials) {
        const Chat = await this.chat.create({ chat_name: credentials.name });
        credentials.user_id.forEach(id => {
            this.users_chats.create({ chat_id: Chat.chat_id, user_id: id });
        });
        return Chat;
    }
};
exports.ChatsService = ChatsService;
exports.ChatsService = ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CHATS_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USERS_CHATS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object])
], ChatsService);
//# sourceMappingURL=chats.service.js.map
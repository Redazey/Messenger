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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const users_chats_entity_1 = require("../users_chats/users_chats.entity");
let UsersService = class UsersService {
    constructor(users, user_chats) {
        this.users = users;
        this.user_chats = user_chats;
    }
    async findOne(email) {
        return await this.users.findOne({
            where: {
                email: email,
            },
        });
    }
    async findByName(username) {
        return await this.users.findAll({
            attributes: ['user_id', 'username'],
            where: {
                username: {
                    [sequelize_1.Op.iLike]: `%${username}%`,
                },
            },
        });
    }
    async findByChat(chat_id) {
        return await this.users.findAll({
            attributes: ['user_id', 'username'],
            include: {
                model: users_chats_entity_1.UsersChats,
                where: {
                    chat_id: chat_id,
                },
            },
        });
    }
    async create(credentials) {
        return await this.users.create(credentials);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USERS_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map
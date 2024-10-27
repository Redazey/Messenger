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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const messages_entity_1 = require("../messages/messages.entity");
const users_chats_entity_1 = require("../users_chats/users_chats.entity");
let Chat = class Chat extends sequelize_typescript_1.Model {
};
exports.Chat = Chat;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Chat.prototype, "chat_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false }),
    __metadata("design:type", String)
], Chat.prototype, "chat_name", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], Chat.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => users_chats_entity_1.UsersChats),
    __metadata("design:type", Array)
], Chat.prototype, "usersChats", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => messages_entity_1.Message),
    __metadata("design:type", Array)
], Chat.prototype, "messages", void 0);
exports.Chat = Chat = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'chats', timestamps: false })
], Chat);
//# sourceMappingURL=chats.entity.js.map
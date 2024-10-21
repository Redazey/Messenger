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
exports.UsersChats = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_entity_1 = require("../users/users.entity");
const chats_entity_1 = require("../chats/chats.entity");
let UsersChats = class UsersChats extends sequelize_typescript_1.Model {
};
exports.UsersChats = UsersChats;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UsersChats.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => chats_entity_1.Chat),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], UsersChats.prototype, "chat_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_entity_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], UsersChats.prototype, "user_id", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], UsersChats.prototype, "entered_at", void 0);
exports.UsersChats = UsersChats = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users_chats', timestamps: false })
], UsersChats);
//# sourceMappingURL=users_chats.entity.js.map
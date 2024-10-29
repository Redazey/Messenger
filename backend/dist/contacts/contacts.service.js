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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("../users/users.entity");
let ContactsService = class ContactsService {
    constructor(contacts, users) {
        this.contacts = contacts;
        this.users = users;
    }
    async findAll(user_id) {
        const contacts = await this.contacts.findAll({
            where: { user_id: user_id },
            include: [
                {
                    model: users_entity_1.User,
                    attributes: ['username', 'user_id'],
                    as: 'contact',
                    required: true,
                },
            ],
        });
        return contacts.map(contact => contact.get('contact'));
    }
    async delete(credentials) {
        this.contacts.truncate({
            where: {
                user_id: credentials.user_id,
                contact_id: credentials.contact_id,
            },
        });
        return this.contacts.truncate({
            where: {
                user_id: credentials.contact_id,
                contact_id: credentials.user_id,
            },
        });
    }
    async isExists(credentials) {
        const contact = this.contacts.findOne({
            where: {
                user_id: credentials.contact_id,
            },
        });
        return contact;
    }
    async create(credentials) {
        this.contacts.create({
            user_id: credentials.user_id,
            contact_id: credentials.contact_id,
        });
        return this.contacts.create({
            user_id: credentials.contact_id,
            contact_id: credentials.user_id,
        });
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CONTACTS_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map
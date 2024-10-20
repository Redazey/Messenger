"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('messages', {
            message_id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id',
                },
                onDelete: 'CASCADE',
            },
            chat_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'chats',
                    key: 'chat_id',
                },
                onDelete: 'SET NULL',
            },
            message_text: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            deleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            sent_at: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            edit_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
        });
    },
};
//# sourceMappingURL=messages.migration.js.map
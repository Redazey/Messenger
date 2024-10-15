import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('contacts', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onDelete: 'CASCADE',
      },
      contact_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contact_type: {
        type: DataTypes.STRING(50), // Assuming you have a field called contact_type
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('contacts', {
      fields: ['user_id', 'contact_type', 'contact_id'],
      type: 'unique',
      name: 'unique_user_contact',
    });
  },
};

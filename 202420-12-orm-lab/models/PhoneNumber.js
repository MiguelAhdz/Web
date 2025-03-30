const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PhoneNumber', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Person',
        key: 'id'
      }
    },
    area_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    exchange: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    number: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PhoneNumber',
    timestamps: false
  });
};

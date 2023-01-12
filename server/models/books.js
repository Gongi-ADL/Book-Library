'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    static associate(models) {
      books.belongsTo(models.categories, {
        foreignKey: 'id',
        targetKey: 'id_category'
      })
    }
  }
  books.init({
    bookName: DataTypes.STRING,
    bookDesc: DataTypes.STRING,
    bookImg: DataTypes.STRING,
    id_category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    static associate(models) {
      categories.hasMany(models.books, {
        foreignKey: 'id_category'
      })
    }
  }
  categories.init({
    categoryName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};
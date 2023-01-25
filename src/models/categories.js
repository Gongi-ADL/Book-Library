import { DataTypes } from "sequelize";
import db from "../database/connection.js";
import { Book } from "./books.js";

//creando modelo de tabla Categories

export const Categories = db.define('categories', {
    id_category:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name:{
        type: DataTypes.STRING
    }
}, { timestamps: false } )

//declarando relaciones entre tablas

Categories.hasMany(Book, {
    foreignKey: 'id_cat',
    sourceKey: 'id_category'
})

Book.belongsTo(Categories, {
    foreignKey: 'id_cat',
    targetKey: 'id_category'
})
import db from "../database/connection.js";
import { DataType, DataTypes } from "sequelize";

const bookFile = db.define('book_files', {
    id_file:{
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    book_img:{
        type: DataTypes.STRING,
        allowNull: false
    },
    book_file:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cloudinary_id: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {timestamps: false, freezeTableName: true})
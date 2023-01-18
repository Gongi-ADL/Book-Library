import { DataTypes } from 'sequelize';
import bd from '../db/connection.js';

const Books = bd.define('Book', ({
  book_name:{
    type: DataTypes.STRING
  },
  book_desc:{
    type: DataTypes.STRING
  },  
  book_img:{
    type: DataTypes.STRING
  },  
  id_category:{
    type: DataTypes.INTEGER
  } 
}))
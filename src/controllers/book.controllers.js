import { where } from "sequelize"

//importando modelos de tablas:
import { Book } from "../models/books.js"
import { bookFile } from "../models/bookFiles.js"


//importando controladores de Cloudinary:
import { uploadImage, deleteImage } from "../libs/Cloudinary.js"


//configurando variables de entorno:
import dotenv from 'dotenv'
dotenv.config()

//creando controladores
const create = async (req, res) => {
    
    const { book, price, date } = req.body
    
    
    let image;
    if (req.files){
       const result = await uploadImage(req.files[0].path)
       image = {
        bookImg: result.secure_url,
        ImgPublicId: result.public_id,
       }

       const { bookImg, ImgPublicId } = image //este const va aca porque no puede acceder a los datos antes de que sea inicializado
    }
    try{
        const newBook = await Book.create({
            book_name: book,
            book_price: price,
            book_date: date
        })
        const addImage = await bookFile.create({
            book_img: image.bookImg,
            book_file: 'for example',
            cloudinary_id: image.ImgPublicId,
            bookIdBook: newBook.dataValues.id_book
        })
        
        res.status(201).json('The book has been created')
    }catch(error){
        res.sendStatus(401)
        console.log(error)
    }
}

const getBooks = async (req, res) => {
    const {limit, offset} = req.params
    const getBooks = await Book.findAll({
        limit: 5,
        offset: process.env.OFFSET
    })
    res.send(getBooks)
}


const getBook = async (req, res) => {
    
    const getBook = await Book.findAll({
        where:{
            book_name: req.params.book
        },
        include: bookFile
    })
    res.status(200).json(getBook)
}

const update = async(req, res) => {
    const {book} = req.body
    const updatingBook = Book.update({
        book_name : book
    },
    {
        where: {
            id_book: req.params.id
        }
    })
    res.status(201).json('The book is updated')
}

const destroy = async(req, res) => {
        Book.destroy({
            where: {
                id_book: req.params.id
            }
        })
    res.sendStatus(202)
}

    
export{
    create,
    getBook,
    getBooks,
    update,
    destroy
}
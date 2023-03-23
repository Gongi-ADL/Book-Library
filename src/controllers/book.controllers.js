import fs from 'fs-extra'

//importando modelos de tablas:
import { Book } from "../models/books.js"
import { bookFile } from "../models/bookFiles.js"
import { desc } from "../models/desc.js";


//importando controladores de Cloudinary:
import { uploadImage, deleteImage } from "../libs/Cloudinary.js"

//importando variables de entorno
import dotenv from 'dotenv'
import { author } from "../models/author.js";
dotenv.config()


//creando controladores
const create = async (req, res) => {
    let image;
    if (req.file){
       const result = await uploadImage(req.file.path)
       await fs.remove(req.file.path)
       image = {
        bookImg: result.secure_url,
        ImgPublicId: result.public_id,
       }
    }

    const { book, price, date, descrip, author, type } = req.body
    const { bookImg, ImgPublicId } = image
    try{
        const addDesc = await desc.create({
            type,
            book_desc: descrip
        })
        const newBook = await Book.create({
            book_name: book,
            book_price: price,
            book_date: date,
            description: addDesc.dataValues.id_desc,
            author_book: author
        })
        console.log(newBook.dataValues.id_book)
        const bookiFile = await bookFile.create({
            book_img: bookImg,
            cloudinary_id: ImgPublicId,
            bookIdBook: newBook.dataValues.id_book
        })
        res.status(201).json('The book has been created')
    }catch(error){
        res.sendStatus(401)
        console.log(error)
    }
    console.log(req.file)
    console.log(req.body)
}

const getBooks = async (req, res) => {
    const {limit, offset} = req.params
    const getBooks = await Book.findAll({
        limit: 10,
        offset: 0,
        include: [bookFile, desc, author]
    })
    res.send(getBooks)
}


const getBook = async (req, res) => {
    
    try {
        const getBook = await Book.findAll({
            where:{
                id_book: req.params.id
            },
            include: [bookFile, desc, author]
        })
        res.status(202).json(getBook)
    } catch (e) {
        console.error(e)
    }
}

const update = async(req, res) => {
    let image;
    if (req.file){
       const result = await uploadImage(req.file.path)
       await fs.remove(req.file.path)
       image = {
        bookImg: result.secure_url,
        ImgPublicId: result.public_id,
       }
    }

    const { book, price, date, descrip, author, type } = req.body
    const { bookImg, ImgPublicId } = image
    try {

        const OneBook = await Book.findOne({
            where: {
                id_book: req.params.id
            }
        })
        const updatingBook = await Book.update({
            book_name: book,
            book_price: price,
            book_date: date,
        },
        {
            where: {
                id_book: req.params.id
            }
        })
        const updatingDesc = await desc.update({
            type,
            book_desc: descrip
        },
        {
            where: {
                id_desc: OneBook.dataValues.description
            }
        })
        const updatingImage = await bookFile.update({
            book_img: bookImg,
            cloudinary_id: ImgPublicId
        },
        {
            where: {
                bookidBook: req.params.id
            }
        })
        res.status(201).json('The book is updated')
    } catch (error) {
        console.error(error)
    }
}

const destroy = async(req, res) => {
        try {
            const getBook = await Book.findAll({
                where:{
                    id_book: req.params.id
                },
                include: [bookFile, desc, author]
            })
            const {cloudinary_id} = getBook[0].dataValues.book_file
            deleteImage(cloudinary_id)
            Book.destroy({
                where: {
                    id_book: req.params.id
                }
            })
            res.sendStatus(202)
        } catch (e) {
            console.error(e)
        }
}

    
export{
    create,
    getBook,
    getBooks,
    update,
    destroy
}
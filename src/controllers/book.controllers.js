import { where } from "sequelize"
import { Book } from "../models/books.js"

const createBook = async (req, res) => {
    const { book, price, date } = req.body
    try{
        const newBook = await Book.create({
            book_name: book,
            book_price: price,
            book_date: date
        })
        res.sendStatus(201)
    }catch(error){
        res.sendStatus(401)
        console.log(error)
    }
}

const getBooks = async (req, res) => {
    const getBooks = await Book.findAll()
    res.send(getBooks)
}


const getBook = async (req, res) => {
    const getBook = await Book.findAll({
        where:{
            book_name: req.params.book
        }
    })
    res.status(202).json(getBook)
}

const updateBook = async(req, res) => {
    const {book} = req.body
    const updatingBook = Book.update({
        book_name : book
    },
    {
        where: {
            id_book: req.params.id
        }
    })
    res.sendStatus(202)
}

const destroyBook = async(req, res) => {
        Book.destroy({
            where: {
                id_book: req.params.id
            }
        })
    res.sendStatus(202)
}

    
export{
    createBook,
    getBook,
    getBooks,
    updateBook,
    destroyBook
}
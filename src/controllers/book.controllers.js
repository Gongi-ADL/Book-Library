import { where } from "sequelize"
import { Book } from "../models/books.js"

const create = async (req, res) => {
    const { book, price, date } = req.body
    try{
        const newBook = await Book.create({
            book_name: book,
            book_price: price,
            book_date: date
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
        offset: 0
    })
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
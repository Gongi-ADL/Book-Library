import express from 'express'
import { createBook, destroyBook, getBook, getBooks, updateBook } from '../controllers/book.controllers.js'
import {authMid} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/create-book', authMid, createBook)
router.get('/get-book', getBooks)
router.get('/get-book/:book', getBook)
router.post('/update-book/:id', authMid, updateBook)
router.delete('/delete-book/:id', authMid, destroyBook)

export default router
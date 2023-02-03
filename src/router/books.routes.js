import express from 'express'
import { create, destroy, getBook, getBooks, update } from '../controllers/book.controllers.js'
import {authMid} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/book', authMid, create)
router.get('/book/:book', getBook)
router.put('/book/:id', authMid, update)
router.delete('/book/:id', authMid, destroy)
router.get('/book', getBooks)

export default router
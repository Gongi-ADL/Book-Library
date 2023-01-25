import express from 'express'
import { loginUser, registerUser } from '../controllers/users.controllers.js'

const router = express.Router()

router.post('/register', registerUser)


router.post('/login', loginUser)


router.get('/welcome', (req, res) => {
    if(req.cookies.session_token){
        res.send(`Estas logeado`)
    }
    else{
        res.send(`No estas logeado`)
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('session_token')
    res.send('Cookie Cleared')
})

export default router
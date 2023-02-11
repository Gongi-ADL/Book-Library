import { users } from "../models/users.js";
import bcrypt, { genSalt, hash } from 'bcrypt'
import {v4 as uuidv4} from 'uuid'


const registerUser = async(req, res) => {
    const {username, email, password} = req.body
    let passwordHash = await bcrypt.hash(password, 10, )
    const newUser = await users.create({
        user_name: username,
        user_email: email,
        user_password: passwordHash,
    })
    res.status(201).json('Usuario creado')
}

const loginUser = async(req, res) => {
    const {password, username} = req.body
    const accesUser = await users.findAll({
        where:{
            user_name: username
        }
    })

    //confirmando credenciales

    let passDecrypt = await bcrypt.compare(password, accesUser[0].dataValues.user_password)

    if (passDecrypt == true && accesUser[0].dataValues.user_name == username){
        const uCookie = uuidv4()
        res.cookie('session_token', uCookie) //no reconoce req.cookie
        res.status(200).json('Correcto')
    }else{
        res.status[422].json('The credentials are wrong')
    }
}


export{
    registerUser,
    loginUser,
}
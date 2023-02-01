console.clear()


import express from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv'
import bd from './database/connection.js'


//importando las rutas
import userRouters from './router/users.router.js'
import homeRoutes from './router/home.routes.js';
import bookRoutes from './router/books.routes.js';


//importando modelos de tablas
import './models/books.js';
import './models/desc.js'
import './models/users.js'
import './models/author.js'
import cookieParser from 'cookie-parser';



dotenv.config()


const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded( {extended: true} ));
app.use(cookieParser())


//inicializando rutas
app.use(userRouters)
app.use(homeRoutes)
app.use(bookRoutes)

//inicializando la conexion de la base de datos.

const dbConnection = async() => {
    try {

        await bd.authenticate();
        console.log('You are succesfully connected to the database')
        // await bd.sync({alter: true})

    } catch (error) {

        throw new Error(error)

    }
}

dbConnection()

//inicializando el servidor en el puerto designado.

app.listen(process.env.PORT, () => {
    console.log(`The app is running on ${process.env.PORT}`)
})
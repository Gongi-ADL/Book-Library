import express from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv'
import bd from './db/connection.js'
dotenv.config()

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded( {extended: true} ));

const dbConnection = async() => {
    try {

        await bd.authenticate();
        console.log('You are succesfully connected to the database')

    } catch (error) {

        throw new Error(error)

    }
}

app.use(dbConnection(), ()=> {
    dbConnection()
})

app.listen(process.env.PORT, () => {
    console.log(`The app is running on ${process.env.PORT}`)
})
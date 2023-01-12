const express = require('express');
const port = require('./config.js')
const app = express();

const modelCategories = require('./models').categories
const modelCategories = require('./models').books

app.use(express.json())
app.use(express.urlencoded( { extended: true } ))

app.get('/', (req, res) => {
    res.send('Bienvenido a la librería de libros')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}) 
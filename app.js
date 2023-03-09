const express = require('express')
app = express()
const port = 3000

const handlebars = require("express-handlebars")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")

// Configurações

// Body Parser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', handlebars);

// Mongoose


// Rotas

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
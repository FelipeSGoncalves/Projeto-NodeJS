const express = require('express')
const app = express()
const port = 3000

const admin = require("./routes/admin")

const path = require("path")
const handlebars = require("express-handlebars")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")

/**  Configurações  */
// Body Parser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// Mongoose

// Public
app.use(express.static(path.join(__dirname,"public")))

// Rotas

app.use("/admin", admin)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
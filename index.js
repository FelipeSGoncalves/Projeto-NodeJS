const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')

// Definindo ao Express o HandleBars com template engine do nosso projeto
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// Conexão com o banco de dados MySQL
const Sequelize = require('sequelize')
const sequelize = new Sequelize('test', 'root', 'root', {
    host: "localhost",
    dialect: 'mysql'
})

// Rota
app.get('/cad', (req, res) =>
    res.render('forms/formulario'))

// Rota
app.post('/rota', (req, res) =>
    res.send('Formulário recebido'))

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
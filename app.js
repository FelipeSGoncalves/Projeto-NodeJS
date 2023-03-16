const express = require('express')
const app = express()
const port = 3000

const admin = require("./routes/admin")

const path = require("path")
const handlebars = require("express-handlebars")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")

/**
 * Configurações do aplicativo.
 * 
 * @module Configurações
 */

/**
 * Configura e utiliza as bibliotecas 'session' e 'flash' no aplicativo Express.js.
 * @function
 * @param {Object} app - Instância do Express.js
 * @returns {void}
 */
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))

/**
 * Middleware que permite que as mensagens flash sejam passadas para as views através de objetos "locals".
 * @function
 * @param {Object} req - Objeto da requisição HTTP
 * @param {Object} res - Objeto da resposta HTTP
 * @param {Function} next - Função callback para o próximo middleware na fila
 * @returns {void}
 */
app.use(flash())
app.use((req, res, next) => {
    /**
     * Propriedade que recebe uma mensagem de sucesso a ser exibida na view.
     * @type {string}
     */
    res.locals.success_msg = req.flash("success_msg")

    /**
     * Propriedade que recebe uma mensagem de erro a ser exibida na view.
     * @type {string}
     */
    res.locals.error_msg = req.flash("error_msg")

    next()
})


/** 
 * Configura o body-parser para analisar solicitações HTTP.
 * @function
 * @name module:Configurações#bodyParser
 */
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

/**
 * Configura o Handlebars como o mecanismo de visualização para o Express.
 * @function
 * @name module:Configurações#handlebars
 */
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

/**
 * Configura o Mongoose como o ODM para o MongoDB.
 * @function
 * @name module:Configurações#mongoose
 */
mongoose.Promise = global.Promise;

/**
 * Conecta ao MongoDB.
 * @function
 * @name module:Configurações#mongoose.connect
 */
mongoose.connect('mongodb://127.0.0.1:27017/teste', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão bem-sucedida!');
}).catch((err) => {
    console.error('Erro na conexão!', err);
});

/**
 * Configura o Express para servir arquivos estáticos.
 * @function
 * @name module:Configurações#static
 */
app.use(express.static(path.join(__dirname, "public")))

/**
 * Middleware para imprimir "Oi" no console.
 * @function
 * @name module:Configurações#logger
 */
app.use((req, res, next) => {
    console.log("Oi")
    next()
})

/**
 * Rotas do aplicativo.
 * 
 * @module Rotas
 */

/**
 * Rota principal.
 * @name GET/
 * @function
 * @memberof module:Rotas
 * @param {object} req - O objeto de solicitação.
 * @param {object} res - O objeto de resposta.
 */
app.get('/', (req, res) => res.send('Hello World!'))

/**
 * Rota do painel administrativo.
 * @name module:Rotas/admin
 * @function
 * @memberof module:Rotas
 */
app.use("/admin", admin)

/**
 * Inicia o servidor HTTP.
 * @function
 * @name module:App#listen
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

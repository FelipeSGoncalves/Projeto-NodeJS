const express = require('express')
const app = express()
const port = 3000

const admin = require("./routes/admin")
const public = require("./routes/public")

const path = require("path")
const handlebars = require("express-handlebars")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")

app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))

app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

// Body Parser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

//HandleBars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/teste', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão bem-sucedida!');
}).catch((err) => {
    console.error('Erro na conexão!', err);
});

//Public
app.use(express.static(path.join(__dirname, "public")))

//Rotas
app.use((req, res, next) => {
    console.log("Oi")
    next()
})

app.use("/admin", admin)
app.use("/", public)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

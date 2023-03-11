const express = require("express")
const router = express.Router()

// Criando um Grupo de Rotas para o prefixo '/admin'

router.get('/', (req, res) => {
    // res.send('Dashboard Page')
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send('Posts Page')
})


router.get('/categorias', (req, res) => {
    res.send('Categorias Page')
})

module.exports = router
const express = require('express')
const mongoose = require('mongoose')

// Cria um roteador do Express.
const router = express.Router()

// Importa o modelo de Categorias definido no arquivo "Categorias.js".
require('../models/Categorias')
const Categoria = mongoose.model('categorias')

// Define rotas para o painel de administração.

// Rota para a página inicial do painel de administração.
router.get('/', (req, res) => {
    res.render('admin/index')
})

// Rota para a página de posts.
router.get('/posts', (req, res) => {
    res.send('Posts Page')
})

// Rota para a página de categorias.
router.get('/categorias', (req, res) => {
    res.render('admin/categorias')
})

// Rota para criar uma nova categoria.
router.post('/categorias/nova', (req, res) => {
    // Cria um objeto novaCategoria com as informações enviadas pelo formulário.
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    // Salva o objeto novaCategoria no banco de dados.
    new Categoria(novaCategoria).save().then(() => {
        console.log('Salva com sucesso.')
    }).catch((erro) => {
        console.log('Erro ao salvar a categoria. ' + erro)
    })
})

// Rota para a página de adicionar uma nova categoria.
router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

// Exporta o roteador do Express para ser utilizado em outros arquivos.
module.exports = router

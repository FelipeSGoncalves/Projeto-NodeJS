const express = require('express')
const mongoose = require('mongoose')

// Cria um roteador do Express.
const router = express.Router()

// Importa o modelo de Categorias definido no arquivo "Categorias.js".
require('../models/Categorias')
const Categoria = mongoose.model('categorias')

/**
 * Roteador para as páginas do painel de administração.
 * @type {Object}
 */
const adminRouter = {

    /**
     * Rota para a página inicial do painel de administração.
     * @function
     * @param {Object} req - Objeto da requisição HTTP
     * @param {Object} res - Objeto da resposta HTTP
     * @returns {void}
     */
    index: function (req, res) {
        res.render('admin/index')
    },

    /**
     * Rota para a página de posts.
     * @function
     * @param {Object} req - Objeto da requisição HTTP
     * @param {Object} res - Objeto da resposta HTTP
     * @returns {void}
     */
    posts: function (req, res) {
        res.send('Posts Page')
    },

    /**
     * Rota para a página de categorias.
     * @function
     * @param {Object} req - Objeto da requisição HTTP
     * @param {Object} res - Objeto da resposta HTTP
     * @returns {void}
     */
    categorias: function (req, res) {
        Categoria.find().sort({date: 'desc'}).lean().then((categorias) => {
            console.log(categorias)
            res.render('admin/categorias', {categorias: categorias})
        }).catch((erro) =>{
            req.flash("error_msg", "Houve um erro ao listar")
            res.redirect("/admin")
        })
    },

    /**
     * Rota para criar uma nova categoria.
     * @function
     * @param {Object} req - Objeto da requisição HTTP
     * @param {Object} res - Objeto da resposta HTTP
     * @returns {void}
     */
    novaCategoria: function (req, res) {
        /**
         * Objeto que contém as informações enviadas pelo formulário.
         * @type {Object}
         * @property {string} nome - Nome da nova categoria.
         * @property {string} slug - Slug da nova categoria.
         */

        var erros = []
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }


        if (req.body.nome == "" || req.body.slug == "") {
            erros.push({ texto: "Preencha todos os campos!oi" })
        }

        if (req.body.nome.length < 8) {
            erros.push({ texto: "Nome da categoria muito pequeno." })
        }

        if (erros.length > 0) {
            res.render("admin/addcategorias", { erros: erros })
        } else {
            // Salva o objeto novaCategoria no banco de dados.
            new Categoria(novaCategoria).save().then(() => {
                /**
                 * Mensagem de sucesso que será exibida na próxima requisição.
                 * @type {string}
                 */
                const successMsg = "Categoria criada com sucesso!"
                req.flash("success_msg", successMsg)
                res.redirect("/admin/categorias")
            }).catch((erro) => {
                /**
                 * Mensagem de erro que será exibida na próxima requisição.
                 * @type {string}
                 */
                const errorMsg = "Erro ao salvar categoria! Tente novamente."
                req.flash("error_msg", errorMsg)
                res.redirect("/admin")
            })
        }
    },

    /**
     * Rota para a página de adicionar uma nova categoria.
     * @function
     * @param {Object} req - Objeto da requisição HTTP
     * @param {Object} res - Objeto da resposta HTTP
     * @returns {void}
     */
    addCategoria: function (req, res) {
        res.render('admin/addcategorias')
    }
}

// Define as rotas utilizando o roteador do Express.
router.get('/', adminRouter.index)
router.get('/posts', adminRouter.posts)
router.get('/categorias', adminRouter.categorias)
router.post('/categorias/nova', adminRouter.novaCategoria)
router.get('/categorias/add', adminRouter.addCategoria)

// Exporta o roteador do Express para ser utilizado em outros arquivos.
module.exports = router

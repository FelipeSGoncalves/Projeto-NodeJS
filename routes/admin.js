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

    categorias: {
        /**
             * Rota para a página de listagem de categorias.
             * @function
             * @param {Object} req - Objeto da requisição HTTP
             * @param {Object} res - Objeto da resposta HTTP
             * @returns {void}
             */
        list(req, res) {
            Categoria.find().sort({ date: 'desc' }).lean().then((categorias) => {
                res.render('admin/categorias/listcategorias', { categorias: categorias })
            }).catch((erro) => {
                req.flash("error_msg", "Houve um erro ao listar")
                res.redirect("/admin")
            })
        },

        /**
            * Rota para a página de adicionar uma nova categoria.
            * @function
            * @param {Object} req - Objeto da requisição HTTP
            * @param {Object} res - Objeto da resposta HTTP
            * @returns {void}
        */
        add(req, res) {
            res.render('admin/categorias/addcategorias')
        },

        /**
            * Rota para criar uma nova categoria.
            * @function
            * @param {Object} req - Objeto da requisição HTTP
            * @param {Object} res - Objeto da resposta HTTP
            * @returns {void}
        */
        create(req, res) {
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

            if (req.body.nome.length < 2) {
                erros.push({ texto: "Nome da categoria muito pequeno." })
            }

            if (erros.length > 0) {
                res.render("admin/categorias/addcategorias", { erros: erros })
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

        edit(req, res) {
            Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
                res.render("admin/categorias/editcategorias", { categoria: categoria })
            }).catch((erro) => {
                req.flash("error_msg", "Categoria não encontrada!")
                res.redirect("/admin/categorias")
            })

        },

        /**
            * Edita uma categoria existente no banco de dados.
            *
            * @function
            * @name saveEditCategoria
            * @param {object} req - Objeto de requisição do Express.
            * @param {object} res - Objeto de resposta do Express.
            * @returns {undefined}
        */
        update(req, res) {

            Categoria.findOne({ _id: req.body.id }).then((categoria) => {

                // Cria uma instância do modelo de categoria
                const editCategoria = new Categoria({
                    nome: req.body.nome,
                    slug: req.body.slug
                });

                // Salva a instância da categoria editada
                editCategoria.save().then(() => {
                    req.flash("success_msg", "Categoria editada com sucesso!")
                    res.redirect("/admin/categorias")
                }).catch((erro) => {
                    req.flash("error_msg", "Erro interno ao salvar a edição.")
                    res.redirect("admin/categorias")
                })
            }).catch((erro) => {
                req.flash("error_msg", "Erro ao editar categoria!" + erro)
                res.redirect("/admin/categorias")
            });
        },

        /**
         * Remove uma categoria existente no banco de dados.
         *
         * @function
         * @name deleteCategoria
         * @param {object} req - Objeto de requisição do Express.
         * @param {object} res - Objeto de resposta do Express.
         * @returns {undefined}
         */
        delete(req, res) {
            Categoria.findOneAndRemove({ _id: req.params.id }).then(() => {
                req.flash("success_msg", "Categoria deletada com sucesso!")
                res.redirect("/admin/categorias")
            }).catch((erro) => {
                req.flash("error_msg", "Erro ao deletar a categoria.")
                res.redirect("/admin/categorias")
            })
        }
    },

    posts: {

        /**
         * Rota para a página de posts.
         * @function
         * @param {Object} req - Objeto da requisição HTTP
         * @param {Object} res - Objeto da resposta HTTP
         * @returns {void}
         */
        list(req, res) {
            res.render("admin/posts/listposts")
        },

        create(req, res) {
            res.render("admin/posts/addposts")
        },

        add(req, res) {
            res.send("oi")
        },

        edit(req, res) {
            res.send("oi")
        },

        update(req, res) {
            res.send("oi")
        },

        delete(req, res) {
            res.send("oi")
        },
    }

}

// Define as rotas utilizando o roteador do Express.
router.get('/', adminRouter.index)

router.get('/posts', adminRouter.posts.list)
router.post('/posts/create', adminRouter.posts.create)
router.get('/posts/add', adminRouter.posts.add)
router.get('/posts/edit/:id', adminRouter.posts.edit)
router.post('/posts/update', adminRouter.posts.update)
router.get('/posts/delete/:id', adminRouter.posts.delete)

router.get('/categorias', adminRouter.categorias.list)
router.post('/categorias/create', adminRouter.categorias.create)
router.get('/categorias/add', adminRouter.categorias.add)
router.get('/categorias/edit/:id', adminRouter.categorias.edit)
router.post('/categorias/update', adminRouter.categorias.update)
router.get('/categorias/delete/:id', adminRouter.categorias.delete)

// Exporta o roteador do Express para ser utilizado em outros arquivos.
module.exports = router

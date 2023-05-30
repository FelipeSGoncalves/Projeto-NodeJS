
const mongoose = require('mongoose')

require('../../models/Post')
const Posts = mongoose.model('posts')

require('../../models/Categorias')
const Categoria = mongoose.model('categorias')

exports.categorias = {

    list(req, res) {
        Categoria.find().sort({ date: 'desc' }).lean().then((categorias) => {
            res.render('categorias/listcategorias', { categorias: categorias })
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao listar")
            res.redirect("/")
        })
    },

    search(req, res) {
        Categoria.findOne({ slug: req.params.slug }).lean().then((categoria) => {
            if (categoria) {
                Posts.find({ categoria: categoria._id }).lean().then((posts) => {
                    res.render("posts/listposts", { posts: posts, categoria: categoria })
                }).catch((erro) => {
                    req.flash("error_msg", "Erro ao listar Posts")
                    res.redirect("/")
                })
            } else {
                req.flash("error_msg", "Categoria não existe")
                res.redirect("/")
            }
        }).catch((erro) => {
            req.flash("error_msg", "Erro Interno")
            res.redirect("/")
        })
    }
}

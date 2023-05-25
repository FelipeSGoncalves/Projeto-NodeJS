
const mongoose = require('mongoose')
const { post } = require('../../routes/public')

require('../../models/Postagens')
const Posts = mongoose.model('postagens')

require('../../models/Categorias')
const Categoria = mongoose.model('categorias')

exports.posts = {

    list(req, res) {
        Posts.find().lean().populate("categoria").sort({ data: "desc" }).then((posts) => {
            res.render("index", { posts: posts })
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao listar as postagens")
            res.redirect("/404")
        })
    },

    erro_404(req, res) {
        res.send("Erro 404")
    },

    postPage(req, res) {
        Posts.findOne({ slug: req.params.slug }).lean().then((post) => {
            if (post) {
                res.render("post/index", { post: post })
            } else {
                req.flash("error_msg", "Post não encontrado")
                res.redirect("/")
            }
        }).catch((erro) => {
            req.flash("error_msg", "Erro Interno")
            res.redirect("/")
        })
    }
}
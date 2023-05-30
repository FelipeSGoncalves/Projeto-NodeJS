
const mongoose = require('mongoose')

require('../../models/Post')
const Posts = mongoose.model('posts')

require('../../models/Categorias')
const Categoria = mongoose.model('categorias')

exports.posts = {

    list(req, res) {
        Posts.find().lean().populate("categoria").sort({ data: "desc" }).then((posts) => {
            res.render("admin/posts/listposts", { posts: posts })
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao listar os posts")
            res.redirect("/admin/posts")
        })
    },

    add(req, res) {
        Categoria.find().lean().then((categorias) => {
            res.render("admin/posts/addpost", { categorias: categorias })
        }).catch((erro) => {
            req.flash("error_msg", "Erro ao carregar o formulário")
        })
    },

    create(req, res) {
        var erros = []

        const novoPost = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }

        if (novoPost.categoria == "0") {
            erros.push({ text: "Categoria inválida, registre uma categoria" })
        }

        if (!novoPost.titulo || !novoPost.slug || !novoPost.descricao || !novoPost.conteudo ||
            novoPost.titulo.trim() === "" || novoPost.slug.trim() === "" || novoPost.descricao.trim() === "" || novoPost.conteudo.trim() === "") {
            erros.push({ texto: "Preencha todos os campos!" });
        }

        if (novoPost.titulo.length < 2) {
            erros.push({ texto: "Título do Post muito pequeno." })
        }

        if (erros.length > 0) {
            Categoria.find().lean().then((categorias) => {
                res.render("admin/posts/addpost", { categorias: categorias, erros: erros });
            }).catch(() => {
                console.log("erro");
            });
        } else {
            new Posts(novoPost).save().then(() => {
                const successMsg = "Post criado com sucesso!"
                req.flash("success_msg", successMsg)
                res.redirect("/admin/posts")
            }).catch((erro) => {
                const errorMsg = "Erro ao salvar o post! Tente novamente."
                req.flash("error_msg", errorMsg)
                res.redirect("/admin/posts")
            })
        }
    },

    edit(req, res) {
        Posts.findOne({ _id: req.params.id }).lean().then((post) => {
            Categoria.find().lean().then((categorias) => {
                res.render("admin/posts/editpost", { categorias: categorias, post: post })
            }).catch((erro) => {
                req.flash("error_msg", "Houve um erro ao listar as categorias")
                res.redirect("/admin/posts")
            })
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao carregar o formulário")
            res.redirect("/admin/posts")
        })
    },

    update(req, res) {
        Posts.updateOne(
            {
                _id: req.body.id
            },
            {
                $set: {
                    titulo: req.body.titulo,
                    slug: req.body.slug,
                    descricao: req.body.descricao,
                    conteudo: req.body.conteudo,
                    categoria: req.body.categoriax
                }
            }).then(() => {
                req.flash("success_msg", "Post editado com sucesso")
                res.redirect("/admin/posts")
            }).catch((erro) => {
                req.flash("error_msg", "Erro interno ao salvar a edição.")
                res.redirect("/admin/posts")
            })
    },

    delete(req, res) {
        Posts.findOneAndRemove({ _id: req.params.id }).then(() => {
            req.flash("success_msg", "Post deletado com sucesso!")
            res.redirect("/admin/posts")
        }).catch((erro) => {
            req.flash("error_msg", "Erro ao deletar o post.")
            res.redirect("/admin/posts")
        })
    },
}

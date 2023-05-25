
const mongoose = require('mongoose')

require('../../models/Postagens')
const Posts = mongoose.model('postagens')

require('../../models/Categorias')
const Categoria = mongoose.model('categorias')

exports.categorias = {

    list(req, res) {
        Categoria.find().sort({ date: 'desc' }).lean().then((categorias) => {
            res.render('admin/categorias/listcategorias', { categorias: categorias })
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao listar")
            res.redirect("/admin")
        })
    },

    add(req, res) {
        res.render('admin/categorias/addcategorias')
    },

    create(req, res) {

        var erros = []
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        if (novaCategoria.nome == "" || novaCategoria.slug == "") {
            erros.push({ texto: "Preencha todos os campos!" })
        }

        if (novaCategoria.nome.length < 2) {
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


    update(req, res) {

        Categoria.updateOne(
            { _id: req.body.id },
            { $set: { nome: req.body.nome, slug: req.body.slug } }
        ).then(() => {
            req.flash("success_msg", "Categoria editada com sucesso!");
            res.redirect("/admin/categorias");
        }).catch((erro) => {
            req.flash("error_msg", "Erro interno ao salvar a edição.");
            res.redirect("/admin/categorias");
        });

    },

    delete(req, res) {
        Categoria.findOneAndRemove({ _id: req.params.id }).then(() => {
            req.flash("success_msg", "Categoria deletada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((erro) => {
            req.flash("error_msg", "Erro ao deletar a categoria.")
            res.redirect("/admin/categorias")
        })
    }
}


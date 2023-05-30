
const mongoose = require('mongoose')

require('../../models/Usuario')
const Usuarios = mongoose.model('usuarios')

exports.usuarios = {

    list(req, res) {
        Usuarios.find().lean().populate("nome").sort({ nome: "desc" }).then((usuarios) => {
            res.send({usuarios})
            // res.render("admin/posts/listposts", { posts: posts })
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao listar os usuários")
            res.redirect("/admin")
        })
    },
}
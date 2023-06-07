
const mongoose = require('mongoose')

require('../../models/Usuario')
const Usuarios = mongoose.model('usuarios')

exports.usuarios = {

    list(req, res) {
        Usuarios.find().lean().populate("nome").sort({ nome: "desc" }).then((usuarios) => {

            res.render("admin/usuarios/listusuarios", { usuarios: usuarios })
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao listar os usuários")
            res.redirect("/admin")
        })
    },

    delete(req, res) {
        Usuarios.findOneAndRemove({ _id: req.params.id }).then(() => {
            req.flash("success_msg", "Usuário deletado com sucesso!")
            res.redirect("/admin/users")
        }).catch((erro) => {
            req.flash("error_msg", "Erro ao deletar o usuário.")
            res.redirect("/admin/users")
        })
    },
}

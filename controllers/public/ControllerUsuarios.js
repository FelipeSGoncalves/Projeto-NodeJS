
const mongoose = require('mongoose')

require('../../models/Usuario')
const Usuarios = mongoose.model('usuarios')



const bcrypt = require("bcryptjs")
const passport = require('passport')

exports.usuarios = {

    add(req, res) {
        res.render('usuarios/registro')
    },

    create(req, res) {
        var erros = []

        const novoUsuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            senha2: req.body.senha2
        }
        if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha || !novoUsuario.senha2 ||
            novoUsuario.nome.trim() === "" || novoUsuario.email.trim() === "" || novoUsuario.senha.trim() === "" || novoUsuario.senha2.trim() === "") {
            erros.push({ texto: "Preencha todos os campos!" });
        }

        if (novoUsuario.senha.length < 8) {
            erros.push({ texto: "A senha deve conter no mínimo 8 caracteres." })
        }

        if (novoUsuario.senha != novoUsuario.senha2) {
            erros.push({ texto: "Senhas incompatíveis." })
        }

        if (erros.length > 0) {
            res.render("usuarios/registro", { erros: erros });
        } else {
            Usuarios.findOne({ email: novoUsuario.email }).lean().then((usuario) => {
                if (usuario) {
                    req.flash("error_msg", "E-mail já cadastrado!")
                    res.redirect("/user/registro")
                } else {
                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                            if (erro) {
                                req.flash("error_msg", "Erro interno, tente novamente!")
                                res.redirect("/")
                            } else {
                                novoUsuario.senha = hash

                                new Usuarios(novoUsuario).save().then(() => {
                                    const successMsg = "Usuário criado com sucesso!"
                                    req.flash("success_msg", successMsg)
                                    res.redirect("/user/login")
                                }).catch((erro) => {
                                    const errorMsg = "Erro ao registrar o usuário! Tente novamente."
                                    req.flash("error_msg", errorMsg)
                                    res.redirect("/")
                                })

                            }

                        })
                    })
                }
            }).catch((erro) => {
                req.flash("error_msg", "Houve um erro interno")
                res.redirect("/")
            })

        }

    },

    login(req, res) {
        res.render('usuarios/login')
    },

    postLogin(req, res, next) {

        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/user/login",
            failureFlash: true
        })(req, res, next)
    },

    logout(req, res) {
        req.logout(function (err) {
            if (err) {
                console.log(err);
            }
            req.flash("success_msg", "Logout realizado com sucesso!")
            res.redirect("/")
        });

    }
}

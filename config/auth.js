const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const { usuarios } = require("../controllers/public/ControllerUsuarios")

require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

module.exports = function (passport) {

    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'senha' }, (email, senha, done) => {
        Usuario.findOne({ email: email }).lean().then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: "Esta conta não existe." })
            }

            bcrypt.compare(senha, usuario.senha, (erro, confirm) => {
                if (confirm) {
                    return done(null, usuario)
                } else {
                    return done(null, false, { message: "Senha incorreta." })
                }
            })
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario._id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findOne({ _id: id }).then(usuario => {
            done(null, usuario);
        }).catch(err => {
            done(err, null);
        });
    });


}
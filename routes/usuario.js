const express = require('express')
const router = express.Router()

const Usuarios = require('../controllers/public/ControllerUsuarios');


router.get('/registro', Usuarios.usuarios.add)
router.post('/registro', Usuarios.usuarios.create)
router.get('/login', Usuarios.usuarios.login)
router.post('/login', Usuarios.usuarios.postLogin)
router.get('/logout', Usuarios.usuarios.logout)

module.exports = router

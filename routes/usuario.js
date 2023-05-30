const express = require('express')
const router = express.Router()

const Usuarios = require('../controllers/public/ControllerUsuarios');


router.get('/registro', Usuarios.usuarios.add)
router.post('/registro', Usuarios.usuarios.create)
router.get('/login', Usuarios.usuarios.login)
// router.get('/categorias/list', PublicCategorias.categorias.list)
// router.get('/categorias/posts/:slug', PublicCategorias.categorias.search)

module.exports = router

const express = require('express')
const router = express.Router()
const { Admin } = require('../helpers/Admin');

const adminCategorias = require('../controllers/admin/ControllerCategorias')
const adminPosts = require('../controllers/admin/ControllerPosts');
const adminUsuarios = require('../controllers/admin/ControllerUsuarios');

function index(req, res) {
    res.render('admin/index')
}


router.get('/', Admin, index)
router.get('/categorias', Admin, adminCategorias.categorias.list)
router.post('/categorias/create', Admin, adminCategorias.categorias.create)
router.get('/categorias/add', Admin, adminCategorias.categorias.add)
router.get('/categorias/edit/:id', Admin, adminCategorias.categorias.edit)
router.post('/categorias/update', Admin, adminCategorias.categorias.update)
router.get('/categorias/delete/:id', Admin, adminCategorias.categorias.delete)

router.get('/posts', Admin, adminPosts.posts.list)
router.post('/posts/create', Admin, adminPosts.posts.create)
router.get('/posts/add', Admin, adminPosts.posts.add)
router.get('/posts/edit/:id', Admin, adminPosts.posts.edit)
router.post('/posts/update', Admin, adminPosts.posts.update)
router.get('/posts/delete/:id', Admin, adminPosts.posts.delete)

router.get('/users', Admin, adminUsuarios.usuarios.list)
router.get('/users/delete/:id', Admin, adminUsuarios.usuarios.delete)

module.exports = router

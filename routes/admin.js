const express = require('express')
const router = express.Router()

const adminCategorias = require('../controllers/admin/ControllerCategorias')
const adminPosts = require('../controllers/admin/ControllerPosts');
const adminUsuarios = require('../controllers/admin/ControllerUsuarios');

function index(req, res) {
    res.render('admin/index')
}

router.get('/', index)

router.get('/categorias', adminCategorias.categorias.list)
router.post('/categorias/create', adminCategorias.categorias.create)
router.get('/categorias/add', adminCategorias.categorias.add)
router.get('/categorias/edit/:id', adminCategorias.categorias.edit)
router.post('/categorias/update', adminCategorias.categorias.update)
router.get('/categorias/delete/:id', adminCategorias.categorias.delete)

router.get('/posts', adminPosts.posts.list)
router.post('/posts/create', adminPosts.posts.create)
router.get('/posts/add', adminPosts.posts.add)
router.get('/posts/edit/:id', adminPosts.posts.edit)
router.post('/posts/update', adminPosts.posts.update)
router.get('/posts/delete/:id', adminPosts.posts.delete)

router.get('/users', adminUsuarios.usuarios.list)

module.exports = router

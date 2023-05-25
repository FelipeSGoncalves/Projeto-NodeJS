const express = require('express')
const router = express.Router()

const PublicCategorias = require('../controllers/public/ControllerCategorias')
const PublicPosts = require('../controllers/public/ControllerPosts');

function index(req, res) {
    res.render("index")
}

router.get('/', PublicPosts.posts.list)
router.get('/404', PublicPosts.posts.erro_404)
router.get('/post/:slug', PublicPosts.posts.postPage)
// router.get('/categorias/add', adminCategorias.categorias.add)
// router.get('/categorias/edit/:id', adminCategorias.categorias.edit)
// router.post('/categorias/update', adminCategorias.categorias.update)
// router.get('/categorias/delete/:id', adminCategorias.categorias.delete)

// router.get('/posts', adminPosts.posts.list)
// router.post('/posts/create', adminPosts.posts.create)
// router.get('/posts/add', adminPosts.posts.add)
// router.get('/posts/edit/:id', adminPosts.posts.edit)
// router.post('/posts/update', adminPosts.posts.update)
// router.get('/posts/delete/:id', adminPosts.posts.delete)

module.exports = router

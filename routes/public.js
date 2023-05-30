const express = require('express')
const router = express.Router()

const PublicCategorias = require('../controllers/public/ControllerCategorias')
const PublicPosts = require('../controllers/public/ControllerPosts');

function index(req, res) {
    res.render("index")
}

router.get('/', PublicPosts.posts.list)
router.get('/404', PublicPosts.posts.erro_404)
router.get('/posts/:slug', PublicPosts.posts.postPage)

router.get('/categorias/list', PublicCategorias.categorias.list)
router.get('/categorias/posts/:slug', PublicCategorias.categorias.search)

module.exports = router

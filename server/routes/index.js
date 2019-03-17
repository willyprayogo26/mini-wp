const router = require('express').Router()
const controller_user = require('../controllers/user')
const controller_article = require('../controllers/article')
const image = require('../helpers/images')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router
    .post('/register', controller_user.register)
    .post('/login', controller_user.login)
    .post('/g-login', controller_user.googleLogin)
    .get('/', controller_article.findAll)
    .get('/article', authentication, controller_article.findAllByUser)
    .post('/article', authentication, image.multer.single('image'), image.sendUploadToGCS, controller_article.create)
    .put('/article/:id', authentication, authorization, image.multer.single('image'), image.sendUploadToGCS, controller_article.update)
    .delete('/article/:id', authentication, authorization, controller_article.delete)

module.exports = router
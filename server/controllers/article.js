const Article = require('../models/article')

class ArticleController {
    static findAll(req, res) {
        Article
            .find()
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
    static findAllByUser(req, res) {
        Article
            .find({ author: req.authUser.id })
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(err => {
                console.log('masul')
                res.status(500).json({
                    message: err.message
                })
            })
    }

    static create(req, res) {
        let input = {
            title: req.body.title,
            content: req.body.content,
            author: req.authUser.id,
            featured_image: req.file.cloudStoragePublicUrl
        }
        Article
            .create(input)
            .then(article => {
                res.status(200).json(article)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error'
                })
            })
    }

    static update(req, res) {
        let input = {
            title: req.body.title,
            content: req.body.content,
            author: req.authUser.id,
            featured_image: req.file.cloudStoragePublicUrl
        }
        Article
            .findByIdAndUpdate({ _id: req.params.id }, input, { new: true })
            .then(article => {
                res.status(200).json(article)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error'
                })
            })
    }

    static delete(req, res) {
        Article
            .findByIdAndDelete({ _id: req.params.id })
            .then(() => {
                res.status(200).json({
                    message: 'Article has been deleted'
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error'
                })
            })
    }
}

module.exports = ArticleController
const Model = require('../models/articles')

class Controller {
    static findAll(req, res) {
        let where = {}
        if(req.query) {
            let key = Object.keys(req.query)
            let temp= []
            key.forEach(e => {
                temp.push({ [e]: { $regex: new RegExp(req.query[e], 'i') } })
            })
            if(temp.length > 0) {
                where = {
                    $or: temp
                }
            }
        }
        Model.find(where)
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static findOne(req, res) {
        Model.findById(req.params.id)
        .then(article => {
            if(article) {
                res.status(200).json(article)
            } else {
                res.status(404).json({
                    message: 'Article not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static create(req, res) {
        Model.create({...req.body})
        .then(article => {
            res.status(201).json(article)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static update(req, res) {
        Model.findByIdAndUpdate({_id: req.params.id}, {...req.body})
        .then(article => {
            if(article) {
                res.status(201).json(article)
            } else {
                res.status(404).json({
                    message: 'Article not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        Model.deleteOne({_id: req.params.id})
        .then(article => {
            if(article) {
                res.status(200).json({
                    message: 'Data berhasil di delete'
                })
            } else {
                res.status(404).json({
                    message: 'Article not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = Controller
const routes = require('express').Router()
const Controller = require('../controllers/articles')

routes.get('/', Controller.findAll)
routes.get('/:id', Controller.findOne)
routes.post('/', Controller.create)
routes.put('/:id', Controller.update)
routes.delete('/:id', Controller.delete)

module.exports = routes
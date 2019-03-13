const router = require('express').Router();
const article = require('./articles')

router
  .use('/article', article)

module.exports = router;
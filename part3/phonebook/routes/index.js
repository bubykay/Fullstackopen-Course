var express = require('express')
var router = express.Router()

var phonebook = require('../db/phonebook.json')
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' })
})
  .get('/info', (req, res) => {
    res.send(`<p>phonebook has info for ${phonebook.length} people </p> ${new Date()}`)
  })

module.exports = router

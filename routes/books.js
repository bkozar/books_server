var express = require('express');
var router = express.Router();
var booksGenerator = require('../booksGenerator.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(booksGenerator.getAllBooks());

});

router.post('/', function(req, res, next) {
  var ret = booksGenerator.filterBooks(req.body);
  res.json(ret);
});

module.exports = router;

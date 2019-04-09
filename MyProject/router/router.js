var express = require('express');
var router = express.Router();
var {index, detail, battery} = require('../controller/indexController');

router.get('/', index)
router.get('/=:id', detail)
router.get('/battery', battery)

module.exports = router;
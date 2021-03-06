var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController')


router.get('/create', productController.create);
router.post('/create', productController.store);

router.get('/edit/:id', productController.edit);
router.post('/edit/:id', productController.update);

router.get("/delete/:id",productController.delete);

module.exports = router;
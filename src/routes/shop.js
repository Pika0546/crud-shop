const express = require('express');
const router = express.Router();

const ShopController = require('../controllers/ShopController');
// router.get('/unisex', ShopController.shop);
// router.get('/men', ShopController.shopMen);
// router.get('/women', ShopController.shopWomen);
router.get('/:brand/:gender/:category/:id', ShopController.fullview);
router.get('/:brand/:gender/:category', ShopController.shopByCategory);
router.get('/:brand/:gender', ShopController.shopByGender);
router.get('/:brand', ShopController.shopByBrand)
// router.get('/all/:gender', ShopController.shopByGender)
router.get('/', ShopController.shop);


module.exports = router;

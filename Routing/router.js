const express = require('express')

const productController = require('../Controller/productsController')
const userController = require('../Controller/userController')
const wishlistController = require('../Controller/wishlist')
const cartController  = require('../Controller/cartController')

const jwtMiddleware = require('../Middleware/jwtMiddleware')

const router = new express.Router()

router.get('/allProducts',productController.getAllProducts)

router.post('/register',userController.registerController)

router.post('/login',userController.userLogin)

router.get('/get-product/:id',productController.getProductById)

router.post('/add-wishlist',jwtMiddleware,wishlistController.addToWishlist)

router.get('/wishlist/allproduct',jwtMiddleware,wishlistController.getFromWishlistController)

router.delete('/wishlis/remove/:id',jwtMiddleware,wishlistController.removeWishlistItem)

router.post('/add-cart',jwtMiddleware,cartController.addToCart)

router.get('/cart/allProduct',jwtMiddleware,cartController.getItemFromCart)

router.delete('/cart/remove/:id',jwtMiddleware,cartController.removeItem)

router.get('/cart/increment/:id',jwtMiddleware,cartController.incrementItem)

router.get('/cart/decrement/:id',jwtMiddleware,cartController.decrementItem)

router.delete('/empty/cart',jwtMiddleware,cartController.removeAllItem)

module.exports = router
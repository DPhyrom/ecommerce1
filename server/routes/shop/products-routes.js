const express = require('express')
const { getFilterProduct } = require('../../controllers/shop/product-controller')
const shopProductsRouter = express.Router()

shopProductsRouter.get('/get', getFilterProduct)

module.exports = shopProductsRouter
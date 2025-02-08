const express = require('express')
const { handleImageUpload, fetchAllProducts, editProduct, deleteProduct, addProduct  } = require('../../controllers/admin/products-controller')
const { upload } = require('../../helper/cloudinary')

const adminProductRouter = express.Router()

adminProductRouter.post('/upload-image', upload.single('my_file'), handleImageUpload)
adminProductRouter.post('/add', addProduct)
adminProductRouter.put('/edit/:id', editProduct)
adminProductRouter.delete('/delete/:id', deleteProduct)
adminProductRouter.get('/get', fetchAllProducts)
module.exports = adminProductRouter

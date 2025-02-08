const { imageUploadUtil } = require("../../helper/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result: result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Error occured"
        })
    }
}

// add a new product
const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        const newlyCreateProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        })
        await newlyCreateProduct.save()
        res.status(201).json({
            success: true,
            message: "Upload successful",
            data: newlyCreateProduct
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

// fetch all products
const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            data: listOfProducts
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

// edit product
const editProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        const { id } = req.params;
        const findProduct = await Product.findById(id)
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        }
        findProduct.image = image || findProduct.image
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price == '' ? 0 : price
        findProduct.salePrice = salePrice == '' ? 0 : salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock

        await findProduct.save()
        res.status(200).json({
            success: true,
            message: 'Product Edited',
            data : findProduct
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

// delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const findProduct = await Product.findById(id)
        if(!findProduct){
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }
        await findProduct.deleteOne()
        res.status(200).json({
            success: true,
            message: "Product Deleted"
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}


module.exports = { handleImageUpload, fetchAllProducts, editProduct, deleteProduct, addProduct }

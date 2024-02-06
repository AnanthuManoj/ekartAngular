const products = require('../Model/productSchema')

//get all products from data base
exports.getAllProducts= async(req,res)=>{
    try {
        const allproducts = await products.find()
        res.status(200).json(allproducts)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.getProductById = async(req,res)=>{
    const {id} = req.params;
    try{
        const product = await products.find({id})
        res.status(200).json(product)
    }catch(err){
        res.status(401).json(err)
    }
}
const whishlists = require('../Model/wishlist')



exports.addToWishlist = async(req,res)=>{
    const {id,title,price,description,category,image,rating}= req.body
    const userId = req.payload
    console.log(userId);
    try {
        const existingProduct = await whishlists.findOne({id,userId})
        if(existingProduct){
            res.status(406).json("This product is already in your wish")
        }else{
            const newProduct = new whishlists({
                id,title,price,description,category,image,rating ,userId 
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

exports.getFromWishlistController = async(req,res)=>{
    const userId = req.payload
    console.log(userId);
    try {
        const allProducts = await whishlists.find({userId})
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.removeWishlistItem = async(req,res)=>{
    const {id} = req.params
    console.log(id);
    try {
        const removeItem = await whishlists.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
    }
}
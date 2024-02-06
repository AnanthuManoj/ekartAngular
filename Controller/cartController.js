const carts = require('../Model/cartModel')

exports.addToCart=async(req,res)=>{
  const userId = req.payload
  const { id,title,price,description,category,image,rating ,quantity} =req.body

  try {
    const existingProduct = await carts.findOne({id,userId})
    if(existingProduct){
        existingProduct.quantity+=1
        existingProduct.grandTotal = existingProduct.quantity*existingProduct.price
        await existingProduct.save()
         res.status(200).json(existingProduct)
    }else{
        const newProduct = new carts({
            id,title,price,description,category,image,rating ,quantity ,grandTotal:price,userId
        })
        await newProduct.save()
         res.status(200).json(newProduct)
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error)
  }
}

exports.getItemFromCart = async(req,res)=>{
  const userId = req.payload
  try {
    const alluserProduct =  await carts.find({userId})
    res.status(200).json(alluserProduct)
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.removeItem = async(req,res)=>{
  const {id} = req.params
  try {
    await carts.deleteOne({_id:id})
    res.status(200).json("Deleted Successfully")
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.incrementItem = async(req,res)=>{
  const{id} = req.params
  try{
    const selectedItem = await carts.findOne({_id:id})
    if(selectedItem){
      selectedItem.quantity+=1
      selectedItem.grandTotal = selectedItem.price*selectedItem.quantity
      await selectedItem.save()
      res.status(200).json(selectedItem)
    }else{
      res.status(406).json('No item found')
    }
  }catch(error){
    console.log(error);
    res.status(401).json(error)
  }
}

exports.decrementItem = async(req,res)=>{
  const {id} = req.params
  try {
    const selectedItem = await carts.findOne({_id:id})
    if(selectedItem){
      selectedItem.quantity-=1;
      if(selectedItem.quantity==0){
        await carts.deleteOne({_id:id})
        res.status(406).json('removed')
      }else{
      selectedItem.grandTotal = selectedItem.quantity*selectedItem.price
      await selectedItem.save();
      res.status(200).json(selectedItem)}
    }else{
      res.status(403).json(`No item found`)
    }
  } catch (error) {
    res.status(406).json(error)
  }
}

exports.removeAllItem = async(req,res)=>{
   const id = req.payload
  try{
    await carts.deleteMany({userId:id})
    res.status(200).json("Removed all items")
  }catch(error){
    console.log("Error in remove all items from cart", error)
    res.status(406).send(error)
  }
}
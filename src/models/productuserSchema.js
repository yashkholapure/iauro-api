const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    productName:{
        type: String,
        required:true
    
    },
    price:{
        type: Number,
        required: true
    }
})

//we will create a new collection
const Product = new mongoose.model('Product', productSchema);

module.exports=Product;
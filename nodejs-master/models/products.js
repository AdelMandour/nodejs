var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var products=new Schema({
name:String,
price:Number,
category:{
    type:String,
    ref:"category"
},
image:String
});
mongoose.model("products",products);
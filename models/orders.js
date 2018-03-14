var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var orders=new Schema({
name:String,
component:String,
notes:String,
room:{
    type:Number,
    ref:"Rooms"
},
totalprice:Number,
date:{
    type:Date,
    default:Date.now
},
status:String,
ext:Number
});
mongoose.model("orders",orders);
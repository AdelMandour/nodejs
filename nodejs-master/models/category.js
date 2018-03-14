var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var category=new Schema({
name:String
});
mongoose.model("category",category);
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Rooms=new Schema({
roomnumber:Number
});
mongoose.model("Rooms",Rooms);
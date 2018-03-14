var mongoose=require('mongoose');
var mongoosePaginate=require('mongoose-paginate');
var Schema=mongoose.Schema;
var users=new Schema({
name:String,
email:String,
password:String,
room:Number,
ext:Number,
image:String
});
// users.plugin(mongoosePaginate);
// users.pre('save',function(next){
//     next();
// });
// users.post('remove',function(doc){
// var user_id=doc._id;
// mongoose.model("posts").remove({user:user_id},function(err,result) {
    
// });
// });
mongoose.model("users",users);
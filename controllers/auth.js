var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
var bodyParserMid=bodyParser.urlencoded();
var mongoose = require('mongoose');
var userModel = mongoose.model('users');
router.get('/login',function(req,resp){
    resp.render("auth/login",{
        message:req.flash("msg")
    });
});
router.post('/login',bodyParserMid,function(req,resp){
    var username=req.body.username;
    var password=req.body.password;

    // userModel.find({name:username},function(err,result){
    //     if(!err){
    //          if(password.valueOf()==result[0].password.valueOf()){
    //              console.log("confirm")
    //              req.session.username=result[0].name;
    //              req.session.password=result[0].password;
    //              if(result[0].type=="admin"){
    //                 resp.redirect("/admin/orders");
    //              }else{
    //                 resp.json("user");
    //              }
    //          }
    //     }else{
    //         console.log('not confirm');
    //         resp.redirect("/auth/login");
    //     }
    // });
    if(username=="adel"&&password.valueOf()=="1234"){
        req.session.username="adel";
        req.session.password="1234";
        resp.redirect("/admin/allUsers");
    }else{
        req.flash("msg","invalid username & password");
        resp.redirect("/auth/login");
    }
});

router.get('/register',function(req,resp){
    resp.render("auth/register");
});
router.post('/register',bodyParserMid,function(req,resp){

});
router.get('/logout',function(req,resp){
    req.session.destroy(function(){
        resp.redirect('/auth/login');
    });
});
module.exports=router;
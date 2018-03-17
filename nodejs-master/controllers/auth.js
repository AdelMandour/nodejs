var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
var bodyParserMid=bodyParser.urlencoded();
router.get('/login',function(req,resp){
    resp.render("auth/login",{
        message:req.flash("msg")
    });
});
router.post('/login',bodyParserMid,function(req,resp){
    var username=req.body.username;
    var password=req.body.password;
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
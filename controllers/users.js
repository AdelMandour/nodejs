var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
var bodyParserMid=bodyParser.urlencoded();
var multer=require('multer');
var mongoose=require('mongoose');

var uploadMid=multer({
    dest:"./public/imgs"
});

router.get('/add',function(req,resp){
    resp.render("users/add");
});
router.post('/add',bodyParserMid,function(req,resp){
    var userModel=mongoose.model('users');
    var user=new userModel({
        _id:Number(req.body._id),
        name:req.body.name
    });
    user.save(function(err,doc){
        console.log(doc);
        if(!err){
            resp.redirect("/users/list");
        }else{
            resp.json(err);
        }
    });
    

});
router.get('/list',function(req,resp){
    var userModel=mongoose.model('users');
    userModel.find({},function(err,result){
        if(!err){
            resp.render("users/list",{data:result,msg:req.flash("msg")});
        }else{
            resp.json(err);
        }
    });
   // resp.render("posts/list");
});
router.get('/delete/:id',function(req,resp){
    var userModel=mongoose.model('users');
    userModel.remove({_id:req.params.id},function(err,result){
        if(!err){
            req.flash("msg","deleted");
            resp.redirect("/users/list");
        }else{
            resp.json(err);
        }
    });
});
router.get('/edit/:id',function(req,resp){
    var userModel=mongoose.model('users');
   userModel.findOne({_id:parseInt(req.params.id)},function(err,result){
       if(!err){
        resp.render("users/edit",{data:result});
       }else{
        resp.json(err);
       }
   });
});
router.post('/edit/:id',[bodyParserMid],function(req,resp){
    var userModel=mongoose.model('users');
   userModel.update({_id:parseInt(req.params.id)},{$set:{name:req.body.name}},function(err,result){
       if(!err){
        resp.redirect("/users/list");
        }else{
            resp.json(err);
        }
   });
});


router.get('/allOrders',function(req,resp){
    var orders_user_name=req.session.username;
    orderModel=mongoose.model('orders');
    orderModel.find({'name':orders_user_name},function(err,result){
        if(!err){
            //res.json(result);
            resp.render('users/allOrders',{orders:result});
        }else{
            res.json(err);
        }
    });
   

});





router.post('/allOrders',[bodyParserMid],function(req,resp){
    var dateFrom=req.body.dateFrom;
    var dateTo=req.body.dateTo;
    var orders_user_name=req.session.username;
    orderModel=mongoose.model('orders');
    var today = new Date(dateFrom);
    var today1=today.toISOString();
    var today2 = new Date(dateTo);
    // var tt=new Date(dateTo);
    // var today2=new Date();
    // today2.setDate(tt.getDate()+1);
    var sec=today2.toISOString();
    //console.log(today.toString());
    console.log(today1);
    console.log(sec);
    // console.log(dateFrom);
    // console.log(dateTo);

    
    orderModel.find({
        date: {
            $gte:today1,
            $lte:sec
        }
        ,name:orders_user_name
    },function(err,result){
        if(!err){
            //res.json(result);
            resp.render('users/allOrders2',{dates:result});
            //console.log(result);
        }else{
            res.json(err);
        }

    });

    
    orderModel.find({'name':orders_user_name},function(err,result){
        if(!err){
            //res.json(result);
            resp.render('users/allOrders',{orders:result});
        }else{
            res.json(err);
        }
    });
   

});





module.exports=router;
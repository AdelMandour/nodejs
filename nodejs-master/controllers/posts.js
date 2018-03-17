var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
var bodyParserMid=bodyParser.urlencoded();
var multer=require('multer');
var mongoose=require('mongoose');
var UsersModel=mongoose.model('users');
var uploadMid=multer({
    dest:"./public/imgs"
});

router.get('/add',function(req,resp){
    UsersModel.find({},function(err,result){
        if(!err){
            resp.render("posts/add",{users:result});
        }else{
            resp.json(err);
        }
    });
});
router.post('/add',uploadMid.single('image'),function(req,resp){
    var PostModel=mongoose.model('posts');
    var post=new PostModel({
        _id:req.body._id,
        title:req.body.title,
        user:req.body.user,
        image:req.file.filename
    });
    post.save(function(err,doc){
        if(!err){
        resp.redirect("/posts/list");
        }else{
            resp.json(err);
        }
    });

});
router.get('/list',function(req,resp){
    var PostModel=mongoose.model('posts');
   /* PostModel.find({},function(err,result){
        UsersModel.populate(result,{path:"user",select:"name"},function(err,result){
            if(!err){
                resp.render("posts/list",{data:result,msg:req.flash("msg")});
            }else{
                resp.json(err);
            }
        });
    });*/
    PostModel.find({})
    .sort({_id:-1})
    .populate({path:"user",select:"name"})
    .then(function(result,err){
        if(!err){
            resp.render("posts/list",{data:result,msg:req.flash("msg")});
        }else{
            resp.json(err);
        }
    });
   // resp.render("posts/list");
});
router.get('/search',function(req,resp){
    var PostModel=mongoose.model('posts');
    PostModel.find({title:{"$regex":req.query.keyword,"$options":"i"}})
    .sort({_id:-1})
    .populate({path:"user",select:"name"})
    .then(function(result,err){
        if(!err){
            resp.render("posts/list",{data:result,msg:req.flash("msg")});
        }else{
            resp.json(err);
        }
    });
   // resp.render("posts/list");
});
router.get('/delete/:id',function(req,resp){
    var PostModel=mongoose.model('posts');
    PostModel.remove({_id:req.params.id},function(err,result){
        if(!err){
            req.flash("msg","deleted");
            resp.redirect("/posts/list");
        }else{
            resp.json(err);
        }
    });
});
router.get('/edit/:id',function(req,resp){
    var PostModel=mongoose.model('posts');
   PostModel.findOne({_id:parseInt(req.params.id)},function(err,result){
       if(!err){
        resp.render("posts/edit",{data:result});
       }else{
        resp.json(err);
       }
   });
});
router.post('/edit/:id',[bodyParserMid],function(req,resp){
    var PostModel=mongoose.model('posts');
   PostModel.update({_id:parseInt(req.params.id)},{$set:{title:req.body.title}},function(err,result){
       if(!err){
        resp.redirect("/posts/list");
        }else{
            resp.json(err);
        }
   });
});
module.exports=router;
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bodyParserMid = bodyParser.urlencoded();
var bodyParserJSON = bodyParser.json();
var multer = require('multer');
var mongoose = require('mongoose');
var userModel = mongoose.model('users');
var categoryModel = mongoose.model('category');
var productModel = mongoose.model('products');
var roomModel = mongoose.model('Rooms');
var orderModel = mongoose.model('orders');
var uploadMid = multer({
    dest: "./public/imgs"
});

// checks 


router.get('/checks', function (req, resp) {
    userModel.find({}, function (err, result) {
        if (!err) {
            resp.render("admins/checks", {
                data: result
            });
        } else {
            resp.json(err);
        }
    });
    
  });
  
  
  
  router.get('/orderuser/:id',function(req,resp){
    var usersarr;
    userModel.find({_id:req.params.id},function(error,res){
      if(!error){
        usersarr=res;
        orderModel.find({name:res[0].name},function(err,result){
            if(!err){
                //req.flash("msg","deleted");
                userModel.find({},function(er,re) {
                  if(!er){
                    resp.render("admins/orderuser",{users:re,orders:result});
                  }else{
                    resp.json(er);
                  }
                })
  
            }else{
                resp.json(err);
            }
        });
      }else{
        resp.json(error);
      }
    });
  });
  
  
  
  router.get('/dateorder/:id',function(req,resp){
    var usersarr;
    orderModel.find({_id:req.params.id},function(error,res){
      if(!error){
         resp.render('admins/dateorder',{data:res})
      }else{
        resp.json(error);
      }
    });
  });
  
  
  

router.get('/addUser', function (req, resp) {
    resp.render("admins/add_user");
});
router.post('/addUser', uploadMid.single('image'), function (req, resp) {
    var user = new userModel({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        room: req.body.room,
        ext: req.body.ext,
        type:req.body.type,
        image: req.file.filename
    });
    user.save(function (err, doc) {
        if (!err) {
            resp.redirect("/admin/allUsers");
        } else {
            resp.json(err);
        }
    });

});
router.get('/allUsers', function (req, resp) {
    userModel.find({}, function (err, result) {
        if (!err) {
            resp.render("admins/all_users", {
                data: result
            });
        } else {
            resp.json(err);
        }
    });
});
router.get('/addCategory', function (req, resp) {
    resp.render("admins/add_category");
});
router.post('/addCategory', bodyParserMid, function (req, resp) {
    var cat = new categoryModel({
        name: req.body.name
    });
    cat.save(function (err, doc) {
        if (!err) {
            resp.redirect("/admin/addProduct");
        } else {
            resp.json(err);
        }
    });
});
router.get('/addProduct', function (req, resp) {
    categoryModel.find({}, function (err, result) {
        if (!err) {
            resp.render('admins/add_product', {
                cats: result
            });
        } else {
            resp.json(err);
        }
    });
});
router.post('/addProduct', uploadMid.single('image'), function (req, resp) {
    var product = new productModel({
        name: req.body.product,
        price: req.body.price,
        category: req.body.category,
        image: req.file.filename
    });
    product.save(function (err, doc) {
        if (!err) {
            resp.redirect("/admin/addProduct");
        } else {
            resp.json(err);
        }
    });
});
router.get('/allProducts', function (req, resp) {
    productModel.find({}, function (err, result) {
        if (!err) {
            resp.render('admins/all_products', {
                products: result
            });
        } else {
            resp.json(err);
        }
    });
});
router.get('/addToUser', function (req, res) {
    var usersdata;
    var roomNumber;
    userModel.find({}, function (err, result) {
        if (!err) {
            usersdata = result;
        } else {
            res.json(err);
        }
    });
    roomModel.find({}, function (err, result1) {
        if (!err) {
            roomNumber = result1;
        } else {
            res.json(err);
        }
    });
    productModel.find({}, function (err, result2) {
        if (!err) {
            res.render('admins/add_to_user', {
                data: result2,
                users: usersdata,
                rooms: roomNumber
            });
        } else {
            res.json(err);
        }
    });

});
router.get('/addRoom', function (req, resp) {
    resp.render('admins/add_room');
});
router.post('/addRoom', bodyParserMid, function (req, resp) {
    var room = new roomModel({
        roomnumber: req.body.roomnumber
    });
    room.save(function (err, doc) {
        if (!err) {
            resp.redirect("/admin/addToUser");
        } else {
            resp.json(err);
        }
    });
});
router.post('/addOrder', bodyParserJSON, function (req, res) {
    var mycomponent=[];
    var usercomponent=[];
    //console.log(req.body.component);
    var userordercomponent=req.body.component.split(" ");
    //console.log(ordercomponent);
    userordercomponent.forEach(element => {
        if(element){
            //console.log(element)
            mycomponent[mycomponent.length]=element;
            console.log(mycomponent);
        }
    });
        productModel.find({name:{$in:mycomponent}},function(err,result){
            if(!err){
                usercomponent=result;
                console.log(usercomponent)
                 var order = new orderModel({
                    name: req.body.order_user,
                    component:result,
                    notes: req.body.note,
                    room: req.body.room_numbers,
                    totalprice: req.body.total,
                    date:Date.now(),
                    status: "inprocessing",
                    ext: req.body.ext,
                    amount:req.body.amount
                    });
                    order.save(function(error,doc){
                        if(!error){
                            console.log(doc);
                            res.json(doc)
                        }else{
                            res.json(error)
                        }
                    });
            }else{
                res.json(err);
            }
        });
});
router.get('/productDelete/:id',function(req,resp){
    productModel.remove({_id:req.params.id},function(err,result){
        if(!err){
            //req.flash("msg","deleted");
            resp.redirect("/admin/allProducts");
        }else{
            resp.json(err);
        }
    });
});
router.get('/userDelete/:id',function(req,resp){
    userModel.remove({_id:req.params.id},function(err,result){
        if(!err){
            //req.flash("msg","deleted");
            resp.redirect("/admin/allUsers");
        }else{
            resp.json(err);
        }
    });
});

router.get('/orders',function(req,resp){
  var arrcomponents=[];
    orderModel.find({},function(err,result){
        if(!err){
          result.forEach(function(ord,indx){
            arrcomponents=ord.component.split(" ");
          console.log(arrcomponents)
          my=[];
            arrcomponents.forEach(function(com){
              if(com){
                productModel.find({name:com},function(err,res){
                  if(!err){
                   //console.log(res);
                    //ord.component=res;

                      if(res){
                        console.log("before push",typeof(my));
                          my.push(res[0]);
                          console.log("after push")
                          console.log(my);
                      }else{
                        console.log("Hello")
                      }

                  }else {
                    console.log("Hello Again");
                  }
                });
              }
            });
            //result[indx].component = my;
            console.log("Hi",ord.component,indx);
          });
          console.log(result);
          //resp.render('admins/orders',{orders:result});
        }else{
            resp.json(err);
        }
    });
});




/*router.get('/orders',function(req,resp){
    orderModel.find({},function(err,result){
        if(!err){
            resp.render('admins/orders',{orders:result});
        }else{
            resp.json(err);
        }
    });
});
*/

module.exports = router;

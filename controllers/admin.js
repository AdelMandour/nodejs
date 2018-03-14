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
    roomModel.find({}, function (err, result) {
        if (!err) {
            roomNumber = result;
        } else {
            res.json(err);
        }
    });
    productModel.find({}, function (err, result) {
        if (!err) {
            res.render('admins/add_to_user', {
                data: result,
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
    var order = new orderModel({
        name: req.body.order_user,
        component:req.body.component,
        notes: req.body.note,
        room: req.body.room_numbers,
        totalprice: req.body.total,
        date:Date.now(),
        status: "inprocessing",
        ext: req.body.ext
    });
    order.save(function(err,doc){
        if(!err){
            res.redirect("/admin/listOrders");
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
module.exports = router;
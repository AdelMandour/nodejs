var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
var bodyParserMid=bodyParser.urlencoded();
var multer=require('multer');
var mongoose=require('mongoose');
var orderModel = mongoose.model('orders');
var productModel = mongoose.model('products');
var uploadMid=multer({
    dest:"./public/imgs"
});

router.get('/add', function (req, resp) {
var room;
mongoose.model('Rooms').find({}, function (err, result) {
    if (!err) {

            room=result;

    } else {
        resp.json(err);
    }
});

    mongoose.model('products').find({}, function (err, result) {
        if (!err) {
            resp.render('orders/addorders', {
                products:result,rooms:room
            });
        } else {
            resp.json(err);
        }
    });
});

// obj={"product":{},"rooms":{}};
//   mongoose.model('products').find({}, function (err, result) {
//
//           //
//           // });
//           obj.product=result;
//
//   });
//   mongoose.model('Rooms').find({}, function (err, result) {
//
//           obj.rooms=result;
//
//   });
//
//   resp.render('orders/addorders', {products:obj} );
// });

router.post('/add', uploadMid.single('image'), function (req, resp) {
    var order = new orderModel({
        name:req.session.username,
        amount:req.body.amount,
        component: req.body.component,
        notes: req.body.notes,
        room: req.body.room,
        totalprice:req.body.totalprice
    });
    order.save(function (err, doc) {
        if(!err) {
            resp.redirect("/order/add");
        } else {
            resp.json(err);
        }
    });

});
router.get('/list',function(req,resp){

});
module.exports=router;

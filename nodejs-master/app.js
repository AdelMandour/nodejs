var express=require('express');
var server= express();
require('./models/Rooms');
require('./models/users');
require('./models/orders');
require('./models/category');
require('./models/products');
var authRoutes=require('./controllers/auth');
var postsRoutes=require('./controllers/posts');
var usersRoutes=require('./controllers/users');
var adminRoutes=require('./controllers/admin');
var session=require('express-session');
var flash=require('connect-flash');
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/nodeJsProject");
server.use(session({
secret:"@#%#$^$%",
cookie:{maxAge:1000*60*60*24}
}));
server.use(flash());
server.set("view engine","ejs");
server.set("views",'./views');
server.use(express.static('public'));
server.use('/auth',authRoutes);
server.use(function(req,resp,next){
    if(!(req.session.username&&req.session.password)){
        resp.redirect("/auth/login");
    }else{
        resp.locals={
            name:req.session.username
        }
        next();
    }
});

server.use('/posts',postsRoutes);
server.use('/users',usersRoutes);
server.use('/admin',adminRoutes);
server.listen(8080,function(){
    console.log("started 8080....");
});
if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv');
    dotenv.config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
const db = mongoose.connection;
db.on('error',(error)=> console.log(error));
db.once('open',() => console.log("MongoDB Connected"));

app.set("view engine","ejs");
app.set("views", __dirname+"/views");
app.set("layout",__dirname+"/views/layouts/layout");

app.use(express.urlencoded({limit:'10mb',extended:false}));
app.use(expressLayouts);
app.use(express.static('public'));

const indexRoute = require(__dirname+"/routes/index");
const directorRoute = require(__dirname+"/routes/directors");
app.use("/",indexRoute);
app.use("/directors",directorRoute);//prepend like "director/"
//app.use("/directors/new",directorRoute);

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is up and running");
})
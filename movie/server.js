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

app.use(express.urlencoded({limit:'10mb',extended:true}));
app.use(express.json());
app.use(expressLayouts);
app.use(express.static('public'));

const indexRoute = require(__dirname+"/routes/index");
const directorRoute = require(__dirname+"/routes/directors");
const movieRoute = require(__dirname+"/routes/movies");
app.use("/",indexRoute);
app.use("/directors",directorRoute);//prepend like "director/" => "/directors/new"
app.use("/movies",movieRoute);//any request comes to " /books/so on " url will use this router

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is up and running");
})
if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv');
    dotenv.config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const indexRoute = require("./routes/index")

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
const db = mongoose.connection;
db.on('error',(error)=> console.log(error));
db.once('open',() => console.log("MongoDB Connected"));
app.set("view engine","ejs");
app.set("views", __dirname+"/views");
app.set("layout","layouts/layout");
app.use(expressLayouts);
app.use(express.static('public'));
app.use("/",indexRoute);

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is up and running");
})
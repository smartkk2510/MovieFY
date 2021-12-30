//here routes => Controller in MVC architecture
const express = require('express');
const router = express.Router();
router.get("/",(req,res)=>{
    res.render("index");
})
module.exports = router;
const express = require('express');
const app = express();
app.use(express.urlencoded({limit:'10mb',extended:false}));
app.use(express.json());

const bcrypt = require('bcrypt');

 const users = []
app.get('/users',(req,res) => {
    res.json(users)
})

app.post('/users',async (req,res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hasedPassword = await bcrypt.hash(req.body.password,salt);
        const user = { name: req.body.name,password : hasedPassword};
  
        users.push(user);
        res.status(201).send();
    }catch{
        res.status(500).send();
    }
})

app.post("/users/login",async (req,res) => {
    const user = users.find(user => user.name = req.body.name);
    try{
        if(await bcrypt.compare(req.body.password,user.password)){
            res.send('Success');
        }else{
            res.send('Not Allowed');
        }
    }catch{
        res.status(500).send();
    }
})
app.listen(3000,()=> {console.log("Server is up and running")});
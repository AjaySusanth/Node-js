const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('./models/userModel')
const foodModel = require('./models/foodModel')
const verifyToken = require('./verifyToken')

mongoose.connect('mongodb://localhost:27017/nutrition-tracker')
.then(()=>{
    console.log('Database connected')
})
.catch((err)=>{
    console.log(err)
})

const app = express()


// user registration endpoint

app.use(express.json())
app.post('/register',(req,res)=>{

    let user = req.body

    bcrypt.genSalt(10,(err,salt)=>{
        if(!err){
            bcrypt.hash(user.password,salt,async (err,hpass)=>{
                if(!err){
                    user.password = hpass      
                    try{
                        let doc = await  userModel.create(user)  
                        res.send({message:'User registered'})
                    }
                    catch(err){
                        console.log(err)
                        res.status(500).send({message:'Some problem'})
                    }
                }
            })
        }
    })

})


// login endpoint

app.post('/login',async (req,res)=>{
    let userCred = req.body

    try{
        let user = await userModel.findOne({email:userCred.email})
        if(user!==null){
            bcrypt.compare(userCred.password,user.password,(err,result)=>{
                if (result == true){
                    jwt.sign({email:userCred.email},'nutrition-app',(err,token)=>{
                        if(!err){
                            res.send({message:'Login successfull',token:token})
                        }
                    })    
                }
                else{
                    res.status(403).send({message:'Incorrect password'})
                }
            })
        }
        else{
            res.status(404).send({message:'User not found'})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send({message:'Some problem'})
    }

})


// fetch all foods

app.get('/foods',verifyToken,async (req,res)=>{
    try{
        let foods = await foodModel.find()
        res.send(foods)
    }
    catch(err){
        console.log(err)
        res.status(500).send({message:'Some problem'})
    }

})

// fetch food by name

app.get('/foods/:name',verifyToken,async (req,res)=>{

    try{
        let food = await foodModel.find({name:{$regex:req.params.name,$options:'i'}})
        // when find is used, exact matching is done, whereas regex checks the expression ie if paneer is the word, it return every item having word paneer and $options:'i' is used to make case-insensitive

        if (food.length !==0){
            res.send(food)
        }
        else{
            res.status(404).send({message:'Food item not found'})
        }

    }
    catch(err){
        console.log(err)
        res.status(500).send({message:'Some problem'})
    }
})

app.listen(8000,()=>{
    console.log('Server running')
})
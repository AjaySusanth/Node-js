const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://localhost:27017/auth-demo')
.then(()=>{
    console.log('Connected to db')
})
.catch((err)=>{
    console.log(err)
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    }
},{timestamps:true})

const userModel = mongoose.model('users',userSchema)

const app = express()

// registration end point

app.use(express.json())
const bcrypt = require('bcryptjs')
// Instead of storing password as a string in db, it is encrypted and hashed for better security and bcryptjs is one of the package used for that
app.post('/register',(req,res)=>{
    let user = req.body
    bcrypt.genSalt(10,(err,salt)=>{
        if (!err){
            bcrypt.hash(user.password,salt,(err,hpass)=>{
                if (!err){
                    user.password = hpass

                    userModel.create(user)
                    .then((doc)=>{
                        res.send('Registration successfull')
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.send('Failed')
                    })
                }
            })
        }
    })
    
})


// Login endpoint

let privateKey = 'samplekey'
app.post('/login',(req,res)=>{
    let userCred = req.body

    userModel.findOne({email:userCred.email})
    .then((user)=>{
        
        if (user!==null){
            bcrypt.compare(userCred.password,user.password,(err,result)=>{
                if (result==true){
                    
                    jwt.sign({email:userCred.email},privateKey,(err,token)=>{
                        if (!err){
                            res.send({message:'Login sucessfull',token:token})
                        }
                        else{
                            res.send({message:'Some error,try again later'})
                        }
                    })
                    
                }
                else{
                    res.send({message:'Incorrect password'})
                }
            })
        }
        else{
            res.send({message:'Invalid username'})
        }
    })
    .catch((err)=>{
        console.log(err)
        res.send('Error occured')
    })
})

app.listen(8000,()=>{
    console.log('Server Running')
})
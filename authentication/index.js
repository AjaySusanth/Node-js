const express = require('express')
const mongoose = require('mongoose')

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

app.listen(8000,()=>{
    console.log('Server Running')
})
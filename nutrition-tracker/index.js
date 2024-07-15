const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://localhost:27017/nutrition-tracker')
.then(()=>{
    console.log('Database connected')
})
.catch((err)=>{
    console.log(err)
})

const app = express()

app.listen(8000,()=>{
    console.log('Server running')
})
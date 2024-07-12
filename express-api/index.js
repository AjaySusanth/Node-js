const express = require('express')
const mongoose = require('mongoose')

const app = express();

// Database connection
mongoose.connect('mongodb://localhost:27017/tutorial')
.then(()=>{
    console.log('Connected to db')
})
.catch((err)=>{
    console.log(err)
})


// Creating Schema

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    price:{
        type:Number,
        required:[true,'Price is required'],
        min:1
    },
    quantity:{
        type:Number,
        required:[true,'Quantity is required']
    },
    category:{
        type:String,
        enum:['Clothing','Electronics','Household']
    }
},{timestamps:true})

const productModel = mongoose.model('products',productSchema)

//Creating an end point for GET req : Getting all products

app.get('/products',(req,res)=>{
    productModel.find()
    .then((products)=>{
        res.send(products)
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:'Failed to get products'})
    })
})

// Get req with parameters : Getting products based on id

/*
app.get('/products/:id/:name',(req,res)=>{
    // http://localhost:8000/products/2/Ajay => id=2 and name=Ajay
    console.log(req.params.id)
    console.log(req.params.name)
    res.send({message:'Get products data'})
})
    */

app.get('/products/:id',(req,res)=>{
    productModel.findOne({_id:req.params.id})
    .then((product)=>{
        res.send(product)
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:'Could not find product'})
    })
})

// MIDDLEWARE
/* When a req reaches a backend server before going to a specific api end point, we can create a function to check,edit,format or block the req. This function is called Middleware */

// Example of middleware where if id is less than 10, the req is blocked from main endpoint

app.get('/test/:id',middleware,(req,res)=>{
    console.log("main endpoint")
    res.send({message:'Req recieved'})
})

function middleware(req,res,next){
    if (req.params.id < 10){
        res.send({message:"Request blocked"})
    }
    else{
        next() // next function allows the req to enter to the mani endpoint
    }
}
// To use middleware in every end point, instead of mentionin as a parameter in every end point include app.use(middleware) in the top of code.



// POST REQ - Create product

app.use(express.json())
/* express.json() is an inbulit middleware in express which recieves the req data in chunks and take care of all the things that was used to handle post req and the data is available in req.body */
app.post('/products',(req,res)=>{
    let product = req.body

    productModel.create(product)
    .then((document)=>{ // mongodb records are called documents
        res.send({data:document,message:'Product created'})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:'Failed to create product'})
    })
})

// DELETE req : Delete product

app.delete('/products/:id',(req,res)=>{
    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.send({message:"Delete successfull"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:'Failed to delete product'})
    })
 
})

// PUT req : updating product based on id
app.put('/products/:id',(req,res)=>{
    let product = req.body
    productModel.updateOne({_id:req.params.id},product)
    .then(()=>{
        res.send({message:"Update successfull"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:'Failed to update product'})
    })

})




//Creating a server
app.listen(8000,()=>{
    console.log("Server running")
})
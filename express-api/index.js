const express = require('express')

const app = express();

//Creating an end point for GET req

app.get('/products',(req,res)=>{
    console.log("Get req recieved")
    res.send({message:'Get products data'})
})

// Get req with parameters

app.get('/products/:id/:name',(req,res)=>{
    // http://localhost:8000/products/2/Ajay => id=2 and name=Ajay
    console.log(req.params.id)
    console.log(req.params.name)
    res.send({message:'Get products data'})
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



// POST REQ

app.use(express.json())
/* express.json() is an inbulit middleware in express which recieves the req data in chunks and take care of all the things that was used to handle post req and the data is available in req.body */
app.post('/products',(req,res)=>{
    console.log(req.body)
    res.send('POST req recieved')
})

// DELETE req

app.delete('/products/:id',(req,res)=>{
    console.log(req.params.id)
    res.send({message:"Delete successfull"})
})

// PUT req
app.put('/products/:id',(req,res)=>{
    console.log(req.params.id)
    console.log(req.body)
    res.send({message:"Update successfull"})
})




//Creating a server
app.listen(8000,()=>{
    console.log("Server running")
})
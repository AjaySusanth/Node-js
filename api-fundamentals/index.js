const http = require('http')


/* METHODS

GET - Fetch data
POST - Create data
PUT/PATCH - Update data
DELETE - Delete data
OPTIONS - 

*/

// create a server

// run localhost:8000 on browser and check console
http.createServer((req,res)=>{ // req => to send request, res => to send response
    
    //console.log("Hello")
    // res.end("First response")

    //console.log(req.url) //returns the route to which the req was send
    //console.log(req.method) //returns the type of method of req

    /*
    if (req.url === '/add'){
        res.end("Added data")
    }
    else if (req.url === '/update'){
        res.end('Updated data')
    }
        */

    if (req.url === '/products' && req.method == 'GET'){
        res.end("Get product data")
    }
    else if (req.url === '/products' && req.method === 'POST'){
        res.end("Created product data")
    }
    else if (req.url === '/user' && req.method === 'GET'){
        res.end("Get user data")
    }
    else if (req.url === '/user' && req.method === 'POST'){
        res.end("Created user data")
    }
})
.listen(8000) // listen(port no.)
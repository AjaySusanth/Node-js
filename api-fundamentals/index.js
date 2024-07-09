const http = require('http')
const fs = require('fs')
const url = require('url')


/* METHODS

GET - Fetch data
POST - Create data
PUT/PATCH - Update data
DELETE - Delete data
OPTIONS - 

*/

/* 
http://localhost:8000/products?id=2&name=iphone
In the above url, everything mention ? followed by path represents the query parameters
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


    /*
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
    */


    /*
    // Creating an api end point to fetch all product data
    if (req.url === '/products' && req.method == 'GET'){
        fs.readFile('./products.json','utf-8',(err,data)=>{
            if (err == null){
                res.end(data)
            }
            else{
                res.end("Error in fetching data")
            }
        })
    }
    */


    // -----------------------------------------------------------

    // const url = require('url')
    //console.log(url.parse(req.url,true))

    let products = fs.readFileSync('./products.json','utf-8') //reads the file as a string

    let pasrsedUrl = url.parse(req.url,true)

    // FETCH ALL PRODUCTS
    if (pasrsedUrl.pathname == '/products' && req.method =='GET' && pasrsedUrl.query.id == undefined){
        res.end(products)
    }

    // Fetch Single product based on id
    else if (pasrsedUrl.pathname =='/products' && req.method =='GET' && pasrsedUrl.query.id != undefined)
    {  
        //  console.log(JSON.parse(products)) // converts string to array of objects
        //    res.end('Fetch Single product based on id')

        productArray = JSON.parse(products)

        let product = productArray.find((product)=>{
            return product.id == pasrsedUrl.query.id
        })

        if (product != undefined){
            res.end(JSON.stringify(product)) // res.end should always be a string, JSON.stringify converts object to string
        }
        else {
            res.end(JSON.stringify({message:'Product not found'}))
            // ONLY ONE res.end() ie response can be send. multiple res.end() stmts will not work
        }
    }

        //SENDING DATA THROUGH POST - METHOD , CREATING A NEW PRODUCT
    else if (pasrsedUrl.pathname =='/products' && req.method =='POST'){

        // When data is send through POST method, the every data is send in form of chunks ie the entire data is not send as a whole
        let product = ''

        req.on("data",(chunk)=>{
            //req.on('data',()=>{}) this event is called everytime a chunk of data is recieved and executes the call back fnt
            product = product+chunk
        })

        req.on('end',()=>{
            /*req.on('end',()=>{}) this event is called when all the chunks of data has been recieved.
            the chunk data is send in binary format and this event is important as it converts final data into string readable format. We access the final data in this event
            */
            //console.log(product)


            // Updating the file

            /* if we directly append the data to file, it will appended to the last that is after the square bracket which would mess up the json fromat,
            so first we convert the read data into array and append the new data to that array and then re write the file using that array as a string.*/
            let productArray = JSON.parse(products)
            let newProduct = JSON.parse(product)
            productArray.push(newProduct)

            fs.writeFile("./products.json",JSON.stringify(productArray),(err)=>{
                if (err == null){
                    res.end(JSON.stringify({message:'New product created'}))
                }
            })

        })
    }

        
})
.listen(8000) // listen(port no.)
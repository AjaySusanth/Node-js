const mongoose = require('mongoose')

// Connecting to mongo server

//mongoose.connect('server-name/db-name')
mongoose.connect('mongodb://localhost:27017/apidev-demo')
.then(()=>{
   // console.log('Connection successfull')
})
.catch((err)=>{
    console.log(err)
})


// Creating a schema 

/*
const userSchema = mongoose.Schema({
    name:String,
    age:Number
})
*/


// creating model: model => connection between program and the db-collection OR an object which gives functions to work with the collection 

// const userModel = mongoose.model('collection-name',schema-to-be-followed)
//const userModel = mongoose.model('users',userSchema)

//inserting data

/*
let user = {
    name:"Ajay",
    age:19
}

userModel.create(user)
.then((data)=>{
    console.log(data)
    console.log("Data inserted")
})
.catch((err)=>{
    console.log(err)
})
*/

/* Extra data not mentioned inside the schema will not be entered.
let user = {
    name:"Ajay",
    age:19,
    birthYear:2005
}
in this data, only name and age will be inserted

However, if everything mentioned in schema is not present, still the present data will be inserted

let user = {
    name:"Ajay"
}
    in this case name will be inserted

*/


// Validations

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'] // [value, custom error msg]
    },
    password:{
        type:String,
        required:[true,'Required'],
        minLength:8,
        maxLenght:20
    },
    role:{
        type:String,
        enum:['admin','manager','hr'] //any other than this is not allowed
    },
    age:{
        type:Number,
        min:10,
        max:90
    }
},{timestamps:true})
// timestamps:true will automatically create two cols wich store data of creation adn updation time


const userModel = mongoose.model('users',userSchema)

let user = {
    name:"akshay",
    password:"ffutgfgtf",
    role:'admin',
    age:26
}

/*
userModel.create(user)
.then((data)=>{
    console.log(data)
    console.log("Data inserted")
})
.catch((err)=>{
    console.log(err)
})
*/



// fetching data

/*
userModel.find()
.then((data)=>{
    console.log(data)
})
.catch((err)=>{
    console.log(err)
})
    */
/*
userModel.find({name:'Ajay'})
.then((data)=>{
    console.log(data)
})
.catch((err)=>{
    console.log(err)
})
    */

/*
userModel.findOne({name:'Ajay'})
.then((data)=>{
    console.log(data)
})
.catch((err)=>{
    console.log(err)
})
    */

// userModel.find().sort({age:-1})
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// })

// userModel.find().limit(2)
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// })

// userModel.deleteOne({age:19,name:'Ajay'})
//  .then((info)=>{
//      console.log(info);
//  })
//  .catch((err)=>{
//      console.log(err);
//  })

//  userModel.deleteMany({name:"Ajay"})
//  .then((info)=>{
//      console.log(info);
//  })
//  .catch((err)=>{
//      console.log(err);
//  })

// userModel.updateOne({name:'axs'},{age:24,role:'hr'})
// .then((info)=>{
//     console.log(info);
//   })
//   .catch((err)=>{
//     console.log(err);
// })


userModel.create(user)
.then((data)=>{
    console.log(data)
    console.log("Data inserted")
})
.catch((err)=>{
    console.log(err)
})
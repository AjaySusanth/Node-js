const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    if (req.headers.authorization!==undefined){
        let token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,'nutrition-app',(err,data)=>{
            if(!err){
                next()
            }
            else{
                res.status(403).send({message:"Invalid token"})
            }
        })

    }
    else{
        res.status(498).send({message:"Please send a token"})
    }
}

module.exports = verifyToken
const {send} = require('express/lib/response')
const jsonwebtoken = require('jsonwebtoken')

function authfunction(req,res,next){
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send({message:'access denied'})
    }

    try{
        const verfied = jsonwebtoken.verify(token,process.env.TOKEN_SECRET)
        req.user = verfied
        next()
    }catch(err){
        return res.status(401).send({message:'invalid token'})
    }

}

module.exports = authfunction

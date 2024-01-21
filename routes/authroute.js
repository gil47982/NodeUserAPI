const express = require('express')
const router = express.Router()

const UserModel = require('../models/UserModel.js')

const {registrationValidation, loginValidation} = require('../validations/validations.js')

const bcryptjs = require('bcryptjs')

const jsonwebtoken = require('jsonwebtoken')

//set local env variable
//require('dotenv/config')

//router.get('/userhome',(req,res)=>{
//    res.send('you are in userroute')
//})

router.post('/register', async(req,res)=>{
    //isolate the "error text"

    //validation to check user input
    const {error} = registrationValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']}) //go into error, then details, then into the list, then into message
    }
    //validation to check user unique
    const userExists = await UserModel.findOne({email:req.body.email})
    if(userExists){
        return res.status(400).send({message:"user already exists"})
    }

    //password hashing before saving
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password,salt)


    //code to insert data
    const user = new UserModel({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
        //password:req.body.password
     })

     try{
     const savedUser = await user.save() //mongoDB mongoose command to save to DB
     res.send(savedUser)
    }catch(err){
        res.status(400).send({message:err})
    }
})





router.post('/login', async(req,res)=>{

    //validation to check user input
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']}) //go into error, then details, then into the list, then into message
    }

    //check if user exists
    const user = await UserModel.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send({message:"user does not exist"})
    }

    //check password is correct
    const passwordValidation = await bcryptjs.compare(req.body.password,user.password)
    if(!passwordValidation){
        return res.status(400).send({message:"password is wrong"}) 
    }
    
    //generate auth token
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token',token).send({'auth-token':token})

    //res.send('success')

})

module.exports=router


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFjM2UzNjRkMjFmZGNjMDU1NTYxZDMiLCJpYXQiOjE3MDU3OTE0NzB9.Qbag-llCN4rUOM-EWLDz89GlIK818UTH_XCnotJ0o8g"
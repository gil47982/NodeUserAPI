const express = require('express')
const router = express.Router()

const FilmModel = require('../models/FilmModel.js')
const authfunction = require('../verifytoken.js')

router.get('/', authfunction, async(req,res)=>{
    try{
        const allfilms = await FilmModel.find()
        res.send(allfilms)
    }catch(err){
        res.status(400).send({message:err})
    }
})


router.get('/filmhome',(req,res)=>{
    res.send('you are in filmroute')
})

module.exports = router
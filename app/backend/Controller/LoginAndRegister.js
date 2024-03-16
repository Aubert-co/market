const route = require('express').Router()
const {Person} = require('../models/index')
const bcrypt = require("bcrypt")

const jwt = require('jsonwebtoken')

require('dotenv').config()
const secret = process.env.SECRET_JWT

route
.post('/login',async(req,res)=>{
    const {name,password} = req.body
    
    if( !name || ! password )return res.status( 400 ).send({message:'Missing fields'})
  
    try{
        const results = await Person.findOne({where:{name}})
        
        if(!results)return res.status(404).send({ message: 'User not found'});
        
        const {id,password:hashedPassword} = results

        const compare = await bcrypt.compare(password,hashedPassword)
  
        if (!compare) return res.status(401).send({message: 'Invalid data'})

        const token = jwt.sign({ user_id:id },secret, {expiresIn: '1h' });
        
        res.status(200).send({message: "Successful login", token});

        }catch(err){
            res.status(500).send({message:'Oops, something went wrong! Please try again later.'+err})
        }
})
.post('/register',async(req,res)=>{
    const {name,password} = req.body
    
    if( !name || ! password )return res.status( 400 ).send({message:'Missing fields'})
    try{
        const nameCheck = await Person.findAll({where:{name}})
        
        if (nameCheck.length > 0) return res.status(404).send({ message: 'User already exists' })

        const hashedPassword = await bcrypt.hash(password,10)
        
        await Person.create({name,password:hashedPassword})
        
        res.status(201).send({message:'sucess'})
    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'+err})
    }
})

module.exports = route
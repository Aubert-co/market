import express, { Express,Router,Request,Response } from 'express'
import { RegisterUserController } from './Controller/RegisterUserController'
import { RegisterUser } from './Model/RegisterUser'
import { UserRepository } from './Repository/UserRepository'
import { prisma } from './lib/prima'

const repositoryRegister = new UserRepository( prisma)
const registerUser = new RegisterUser(repositoryRegister)
const register =new RegisterUserController(registerUser )
const app = express()


const route = Router()

app.use(express.json())


route.get('/',(req:Request,res:Response)=>{
    res.status(200).send('hi')
})

route.post('/register',(req,res)=>register.handler(req,res))

app.use( route )

app.listen(8080,()=>{
    console.log('server running')
})


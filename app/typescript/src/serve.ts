import express, { Express,Router,Request,Response } from 'express'
import { RegisterUserController } from './Controller/RegisterUserController'
import { RegisterCredentials } from './Model/RegisterCredentials'
import { UserRepository } from './Repository/UserRepository'
import { prisma } from './lib/prima'
import { LoginCredentials } from './Model/LoginCredentials'
import { LoginController } from './Controller/LoginController'

const userRepository = new UserRepository( prisma)
const registerUser = new RegisterCredentials(userRepository)
const register =new RegisterUserController(registerUser )

const loginUser = new LoginCredentials(userRepository)
const login = new LoginController(loginUser)
const app = express()
 

const route = Router()

app.use(express.json())


route.get('/',(req:Request,res:Response)=>{
    res.status(200).send({message:'Hello world'})
})

route.post('/register',(req,res)=>register.handler(req,res))
route.post('/login',(req,res)=>login.handler(req,res))

app.use( route )

if(process.env.MODE !== "test"){
    app.listen(8080,()=>{
        console.log('server running')
    })

}
export default app;
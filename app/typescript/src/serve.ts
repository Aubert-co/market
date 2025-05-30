import express, { Express,Router,Request,Response } from 'express'
import { RegisterUserController } from './Controller/RegisterUserController'
import { RegisterUser } from './Model/RegisterUser'
import { UserRepository } from './Repository/UserRepository'
import { prisma } from './lib/prima'
import { LoginUser } from './Model/LoginUser'
import { LoginController } from './Controller/LoginController'

const userRepository = new UserRepository( prisma)
const registerUser = new RegisterUser(userRepository)
const register =new RegisterUserController(registerUser )

const loginUser = new LoginUser(userRepository)
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
import express, { Express,Router,Request,Response, RequestHandler } from 'express'
import { RegisterUserController } from './Controller/RegisterUserController'
import { RegisterCredentials } from './Model/RegisterCredentials'
import { UserRepository } from './Repository/UserRepository'
import { prisma } from './lib/prima'
import { LoginCredentials } from './Model/LoginCredentials'
import { LoginController } from './Controller/LoginController'
import { Auth } from './Middleware/Auth'
import { StoreRepository } from './Repository/StoreRepository'
import { StoreService } from './Model/StoreService'
import { StoreController } from './Controller/StoreController'

const userRepository = new UserRepository( prisma)
const storeRepository = new StoreRepository(prisma)

const registerUser = new RegisterCredentials(userRepository)
const register =new RegisterUserController(registerUser )
const storeService = new StoreService(storeRepository)


const createStore = new StoreController(storeService)
const loginUser = new LoginCredentials(userRepository)
const login = new LoginController(loginUser)
const authMiddleware = new Auth()
const app = express()
 

const route = Router()

app.use(express.json())




route.post('/register',(req,res)=>register.handler(req,res))
route.post('/login',(req,res)=>login.handler(req,res))

route.post('/store/create',authMiddleware.handler,createStore.handler)

app.use( route )

if(process.env.MODE !== "test"){
    app.listen(8080,()=>{
        console.log('server running')
    })

}
export default app;
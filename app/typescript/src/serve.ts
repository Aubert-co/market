import express, { Express,Router,Request,Response, RequestHandler, ErrorRequestHandler, NextFunction } from 'express'
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
import multer from "multer";
import { ErrorMiddleware } from './Middleware/Error'

const userRepository = new UserRepository( prisma)
const storeRepository = new StoreRepository(prisma)
const errorMiddleware = new ErrorMiddleware
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

const fileUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 
    },
});


route.post('/register',(req,res,next)=>register.handler(req,res,next))
route.post('/login',(req,res,next)=>login.handler(req,res,next))

//route.post('/store/create',[authMiddleware.handler,fileUpload.single('photo')],createStore.handler)


app.use( route )
app.use((error:ErrorRequestHandler,req:Request,res:Response,next:NextFunction)=>errorMiddleware.handler(error,req,res,next))
if(process.env.MODE !== "test"){
    app.listen(8080,()=>{
        console.log('server running')
    })

}
export default app;
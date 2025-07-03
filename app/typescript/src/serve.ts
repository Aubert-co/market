import express, { Express,Router,Request,Response, RequestHandler, ErrorRequestHandler, NextFunction } from 'express'
import { RegisterUserController } from './Controller/RegisterUserController'
import { RegisterCredentials } from './Services/RegisterCredentials'
import { UserRepository } from './Repository/UserRepository'
import { prisma } from './lib/prima'
import { LoginCredentials } from './Services/LoginCredentials'
import { LoginController } from './Controller/LoginController'
import { Auth } from './Middleware/Auth'
import { StoreRepository } from './Repository/StoreRepository'
import { StoreService } from './Services/StoreService'
import { StoreController } from './Controller/CreateStoreController'
import multer from "multer";
import { ErrorMiddleware } from './Middleware/Error'
import { ValidateCredentials } from './Middleware/ValidateCredentials'
import cookieParser from 'cookie-parser'
import { ValidateImageAndFields } from './Middleware/ValidateImageAndFields'
import { ProductRepository } from './Repository/ProductRepository'
import { ProductService } from './Services/ProductService'
import { CreateProductsController } from './Controller/CreateProductsController'
import redis,{connectRedis} from './lib/redis'
import { GetProductByCategory } from './Controller/GetProductByCategory'
import { GetProducts } from './Controller/GetProductsController'
import cors from 'cors'
import { GetUserStore } from './Controller/GetUserStore'
import { generateSignedUrl } from './Repository/FileUpload'

const userRepository = new UserRepository( prisma)
const storeRepository = new StoreRepository(prisma)
const productRepository = new ProductRepository(prisma,redis)

const validateCredentials = new ValidateCredentials
const validateImageAndFields = new ValidateImageAndFields

const registerUser = new RegisterCredentials(userRepository)
const register =new RegisterUserController(registerUser )
const storeService = new StoreService(storeRepository)
const productService = new ProductService( productRepository)

const createStore = new StoreController(storeService)
const loginUser = new LoginCredentials(userRepository)
const login = new LoginController(loginUser)
const createProduct = new CreateProductsController(productService,storeService)
const getProductByCategory = new GetProductByCategory(productService)
const getProducts = new GetProducts(productService)
const getUserStores = new GetUserStore(storeService)
const app = express()
 

const route = Router()


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  
}));
app.use(cookieParser())
app.use(express.json())

const fileUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 
    },
});


route.post('/register',[validateCredentials.handler],
    (req:Request,res:Response,next:NextFunction)=>register.handler(req,res,next))

route.post('/login',[validateCredentials.handler],
    (req:Request,res:Response,next:NextFunction)=>login.handler(req,res,next))

route.post('/store/create',[fileUpload.single('image'),Auth,
    validateImageAndFields.handler
],(req:Request,res:Response,next:NextFunction)=>createStore.handler(req,res,next))

route.post('/product/create',[
    fileUpload.single('image')
    ,Auth],
  (req:Request,res:Response,next:NextFunction)=>  createProduct.handler(req,res,next)
)
route.get('/product/category/:category',
getProductByCategory.handler
)
route.get('/product/page/:page',
    (req:Request,res:Response,next:NextFunction)=> getProducts.handler(req,res,next)
)
route.get('/store/mystores',[Auth],
    (req:Request,res:Response,next:NextFunction)=>getUserStores.handler(req,res,next))
route.get('/images/:filename', async (req, res) => {
  const { filename } = req.params;

  const signedUrl = await generateSignedUrl(filename);

  res.redirect(signedUrl);
});
app.use( route )
app.use((error:ErrorRequestHandler,req:Request,res:Response,next:NextFunction)=>ErrorMiddleware(error,req,res,next))

const startServer = async()=>{
    try {
        await connectRedis();
       
        if(process.env.MODE !== "test"){
            app.listen(8080,()=>{console.log('server running')});
        }
    } catch (err:any) {
        console.error('Erro ao iniciar servidor:', err);
        process.exit(1);
    }

}
startServer() 
export default app;
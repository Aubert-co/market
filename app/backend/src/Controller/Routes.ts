import multer from "multer";
import { prisma } from "../lib/prima";
import redis from "../lib/redis";
import { ValidateCredentials } from "../Middleware/ValidateCredentials";
import { ValidateImageAndFields } from "../Middleware/ValidateImageAndFields";
import { ProductRepository } from "../Repository/ProductRepository";
import { StoreRepository } from "../Repository/StoreRepository";
import { UserRepository } from "../Repository/UserRepository";
import { LoginCredentials } from "../Services/LoginCredentials";
import { ProductService } from "../Services/ProductService";
import { RegisterCredentials } from "../Services/RegisterCredentials";
import { StoreService } from "../Services/StoreService";


import { LoginController } from "./LoginController";
import { RegisterUserController } from "./RegisterUserController";
import { Router,NextFunction,Request,Response } from "express";
import { generateSignedUrl } from "../Repository/FileUpload";
import { Auth } from "../Middleware/Auth";
import { ProductAdminController } from "./ProductAdminController";
import { ProductsController } from "./ProductsController";
import { StoreAdminController } from "./StoreAdminController";
import { ProductRedisRepository } from "../Repository/ProductRedisRepository";
import { ProductRedisService } from "../Services/ProductRediService";
import { VerifyStoreOwnership } from "../Middleware/VerifyStoreOwnership";

const fileUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 
    },
});
const userRepository = new UserRepository( prisma)
const storeRepository = new StoreRepository(prisma)
const productRepository = new ProductRepository(prisma)
const productRedisRepository = new ProductRedisRepository(redis)

const validateCredentials = new ValidateCredentials
const validateImageAndFields = new ValidateImageAndFields

const registerUser = new RegisterCredentials(userRepository)
const register =new RegisterUserController(registerUser )
const storeService = new StoreService(storeRepository)
const productService = new ProductService( productRepository)
const productRedisService = new ProductRedisService(productRedisRepository)

const loginUser = new LoginCredentials(userRepository)
const login = new LoginController(loginUser)
const productAdmin = new ProductAdminController(productService,storeService)

const verifyStoreOwnership = new VerifyStoreOwnership(storeService)

const storeAdminController = new StoreAdminController(storeService,productService)
const productsController = new ProductsController(productService,productRedisService)
const route = Router();

route.post('/register',[validateCredentials.handler],
    (req:Request,res:Response,next:NextFunction)=>register.handler(req,res,next))

route.post('/login',[validateCredentials.handler],
    (req:Request,res:Response,next:NextFunction)=>login.handler(req,res,next))

route.post('/store/create',[fileUpload.single('image'),Auth,
    validateImageAndFields.handler
],(req:Request,res:Response,next:NextFunction)=>storeAdminController.CreateStore(req,res,next))

route.post('/product/create',[
    fileUpload.single('image')
    ,Auth
    ,(req:Request,res:Response,next:NextFunction)=>verifyStoreOwnership.handler(req,res,next)
],
  (req:Request,res:Response,next:NextFunction)=> productAdmin.createProduct(req,res,next)
)
route.get('/product/category/:category',
productsController.GetProductsByCategory
)
route.get('/product/page/:page',
    (req:Request,res:Response,next:NextFunction)=> productsController.GetProducts(req,res,next)
)
route.get('/store/mystores',[Auth],
    (req:Request,res:Response,next:NextFunction)=>storeAdminController.GetUserStores(req,res,next))

route.delete('/products/delete',[Auth,
    (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnership.handler(req,res,next)],
    (req:Request,res:Response,next:NextFunction)=>productAdmin.DeleteProducts(req,res,next)
)
route.get('/images/:filename', async (req, res) => {
  const { filename } = req.params;

  const signedUrl = await generateSignedUrl(filename);

  res.redirect(signedUrl);
}); 
 
export default route
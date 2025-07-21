import multer from "multer";
import { prisma } from "../Lib/prima";
import redis from "../Lib/redis";
import { ValidateCredentials } from "../Middleware/ValidateCredentials";
import { ValidateImageAndFields } from "../Middleware/ValidateImageAndFields";
import { ProductRepository } from "../Repository/ProductRepository";
import { StoreRepository } from "../Repository/StoreRepository";
import { UserRepository } from "../Repository/UserRepository";

import { ProductService } from "../Services/ProductService";

import { StoreService } from "../Services/StoreService";


import { AuthUserController } from "./AuthUserController";
import { Router,NextFunction,Request,Response } from "express";
import { generateSignedUrl } from "../Lib/FileUpload";
import { Auth } from "../Middleware/Auth";
import { ProductAdminController } from "./ProductAdminController";
import { ProductsController } from "./ProductsController";
import { StoreAdminController } from "./StoreAdminController";
import { ProductRedisRepository } from "../Repository/ProductRedisRepository";
import { ProductRedisService } from "../Services/ProductRediService";
import { VerifyStoreOwnership } from "../Middleware/VerifyStoreOwnership";
import {  UserService } from "../Services/UserService";
import { RefreshTokenController } from "./RefreshTokenController";
import { UserCartRepository } from "../Repository/UserCartRepository";
import { UserCartService } from "../Services/UserCartService";
import { UserCartController } from "./UserCartController";

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
const userService = new UserService(userRepository)
const userCartRepository = new UserCartRepository(prisma)

const validateCredentials = new ValidateCredentials
const validateImageAndFields = new ValidateImageAndFields

const productRedisService = new ProductRedisService(productRedisRepository)
const storeService = new StoreService(storeRepository)
const productService = new ProductService( productRepository,productRedisService)

const userCartService = new UserCartService(userCartRepository)



const authUser = new AuthUserController(userService)
const productAdmin = new ProductAdminController(productService,storeService)

const storeAdminController = new StoreAdminController(storeService,productService)
const productsController = new ProductsController(productService,productRedisService)
const refreshToken = new RefreshTokenController(userService)
const userCartController = new UserCartController(userCartService)
const verifyStoreOwnershipMiddle = new VerifyStoreOwnership(storeService)




const route = Router();

route.post('/register',[validateCredentials.handler],
    (req:Request,res:Response,next:NextFunction)=>authUser.Register(req,res,next))

route.post('/login',[validateCredentials.handler],
    (req:Request,res:Response,next:NextFunction)=>authUser.Login(req,res,next))

route.post('/store/create',[fileUpload.single('image'),Auth,
    validateImageAndFields.handler
],(req:Request,res:Response,next:NextFunction)=>storeAdminController.CreateStore(req,res,next))

route.post('/product/create',[
    fileUpload.single('image')
    ,Auth
    ,(req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)
],
  (req:Request,res:Response,next:NextFunction)=> productAdmin.createProduct(req,res,next)
)
route.get('/product/category/:category',
productsController.GetProductsByCategory
)
route.get('/product/page/:page',
    (req:Request,res:Response,next:NextFunction)=> productsController.GetProducts(req,res,next)
);
route.get('/store/mystores',[Auth],
    (req:Request,res:Response,next:NextFunction)=>storeAdminController.GetUserStores(req,res,next));

route.get('/admin/store/products/:storeId/:page',[
    Auth,
    (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)
],
    (req:Request,res:Response,next:NextFunction)=>storeAdminController.GetProductFromStore(req,res,next)
);
route.delete('/products/delete',[Auth,
    (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)],
    (req:Request,res:Response,next:NextFunction)=>productAdmin.DeleteProducts(req,res,next)
)
route.get('/user/cart',[Auth],
    (req:Request,res:Response,next:NextFunction)=>userCartController.getCartItems(req,res,next)
)
route.delete('/user/cart',[Auth],
    userCartController.removeUserCart
)
route.post('/user/cart/add',[Auth],
    (req:Request,res:Response,next:NextFunction)=>userCartController.addItemToCart(req,res,next)
)
route.put('/user/cart/update',[Auth],
    userCartController.removeUserCart
)
route.get('/auth/me',(req:Request,res:Response,next:NextFunction)=>{
    
})
route.get('/images/:filename', async (req, res) => {
  const { filename } = req.params;

  const signedUrl = await generateSignedUrl(filename);

  res.redirect(signedUrl);
}); 
route.get('/auth/refresh',refreshToken.handler)
 
export default route
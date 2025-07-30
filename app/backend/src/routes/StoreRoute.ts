import { Router,NextFunction,Request,Response} from 'express'
import { StoreAdminController } from '../controller/StoreAdminController'
import { ValidateImageAndFields } from '../middleware/ValidateImageAndFields'
import { Auth } from '../middleware/Auth'
import { StoreService } from '../services/StoreService'
import { prisma } from '../lib/prisma'
import { StoreRepository } from '../repository/StoreRepository'
import { ProductRepository } from '../repository/ProductRepository'
import { VerifyStoreOwnership } from '../middleware/VerifyStoreOwnership'
import { fileUpload } from '../lib/fileUpload'

const validateImageAndFields = new  ValidateImageAndFields
const productRepository = new ProductRepository(prisma)
const storeRepository = new StoreRepository(prisma)
const storeService = new StoreService(storeRepository,productRepository)
const storeAdminController = new StoreAdminController(storeService)
const verifyStoreOwnershipMiddle = new VerifyStoreOwnership(storeService)
const route = Router()
 
route.get('/store/mystores',[Auth],
    (req:Request,res:Response,next:NextFunction)=>storeAdminController.GetUserStores(req,res,next));

route.get('/admin/store/products/:storeId/:page',[
    Auth,
    (req:Request,res:Response,next:NextFunction)=>verifyStoreOwnershipMiddle.handler(req,res,next)
],
    (req:Request,res:Response,next:NextFunction)=>storeAdminController.GetProductFromStore(req,res,next)
);
route.post('/store/create',[fileUpload.single('image'),Auth,
    validateImageAndFields.handler
],(req:Request,res:Response,next:NextFunction)=>storeAdminController.CreateStore(req,res,next))


export default route
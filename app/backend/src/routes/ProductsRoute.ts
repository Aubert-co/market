import { prisma } from "../lib/prisma";
import { ProductRepository } from "../repository/ProductRepository";
import { ProductService } from "../services/ProductService";
import { Router,Request,Response,NextFunction } from "express";
import { ProductRedisRepository } from "../repository/ProductRedisRepository";
import { ProductRedisService } from "../services/ProductRediService";
import redis from "../lib/redis";
import { ProductsController } from "../controller/ProductsController";


const productRepository = new ProductRepository(prisma)
const productRedisRepository = new ProductRedisRepository(redis)
const productRediService = new ProductRedisService( productRedisRepository)

const productService = new ProductService(productRepository,productRediService)

const productsController = new ProductsController(productService,productRediService)


const route = Router()
route.get('/product/category/:category',productsController.GetProductsByCategory)
route.get('/product/page/:page',
    (req:Request,res:Response,next:NextFunction)=> productsController.GetProducts(req,res,next)
);
 
export default route
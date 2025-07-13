import { Worker } from "bullmq";
import { connection } from "./queue";
import { ProductRepository } from "../../Repository/ProductRepository";
import { ProductService } from "../../Services/ProductService";
import { prisma } from "../../lib/prima";
import { deleteImgFromBucket } from "../../Repository/FileUpload";

const productRepository = new ProductRepository(prisma)
const productService = new ProductService(productRepository)
export const deleteProductWoker = new Worker(
    'delete-product',
    async(job)=>{
        const {productId,storeId} = job.data
        const product = await productService.getProductById(productId)
        if(!product || product.storeId !== storeId )return;
        
        await productService.deleteProduct(storeId,productId)
        
        if(product.imageUrl){
            await deleteImgFromBucket(product.imageUrl)
        }
      
    },
    {connection:connection}
)
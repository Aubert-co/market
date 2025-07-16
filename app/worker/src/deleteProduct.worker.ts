import { Worker } from "bullmq";
import { connection } from "./queue";


import { prisma, ProductRepository } from "./Services/prisma";
import { deleteImgFromBucket } from "./Services/storageGoogle";


const productReposotiroy = new ProductRepository(prisma)
type Params={
    productId:number,
    storeId:number,
    productRep:ProductRepository,
}
export const doAWork = async({productId,storeId,productRep}:Params)=>{
    try{
        const product = await productRep.getProductById(productId)
        
        if(!product || product.storeId !== storeId )return;
        
        await productRep.deleteProduct(storeId,productId)
        
        if(product.imageUrl){
            await deleteImgFromBucket(product.imageUrl)
        }
    }catch(err:any){
            throw err
    }
}
export const deleteProductWoker = new Worker(
    'delete-product',
    async(job)=>{
        const {productId,storeId} = job.data
        await doAWork({
            productId,
            storeId,
            productRep:productReposotiroy
        })
    },
    {connection:connection}
)

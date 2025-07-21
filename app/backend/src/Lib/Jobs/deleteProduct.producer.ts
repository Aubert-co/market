import { deleteProductQueue } from "./queue"

export const deleteProductProducer = async(productId:number,storeId:number)=>{
    await deleteProductQueue.add('delete-product',{
        productId,
        storeId
    },{
        removeOnComplete:true,
        removeOnFail:true
    })
}
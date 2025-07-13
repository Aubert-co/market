import { ErrorMessage } from "../Helpers/ErrorMessage";
import { dataProducts, IProductRepository, ProductRepository } from "../Repository/ProductRepository";

export interface IProductService{
    createProduct( data:{ category:string,name: string, description: string,
        storeId: number, price: number, stock: number, imageUrl: string }):Promise<void>,
    selectByCategory(category:string,limit:number,skip:number ):Promise<dataProducts[]>,
    getProducts(limit:number,skip:number):Promise<dataProducts[]>,
    getProductById(id:number):Promise<dataProducts|null >,
    countProducts():Promise<number>,
    countProductStore(storeId:number):Promise<number>,
    getProductsByStoreId(storeId:number,skip:number,limit:number):Promise<dataProducts[]>,
    deleteProduct(storeId:number,productId:number):Promise<void>
}
export class ProductService  implements IProductService{
    constructor(protected product:IProductRepository){}

    public async createProduct( data: {category:string, name: string, description: string,
        storeId: number, price: number, 
        stock: number, imageUrl: string 
    }): Promise<void> {
        try{
            await this.product.createProduct( data )
        }catch(err:any){
           throw new ErrorMessage("Failed to create product. Please check your input and try again.", 422);

        }
    }
    public async selectByCategory( category:string,limit:number,skip:number ):Promise<dataProducts[]>{
        try{
            return await this.product.selectByCategory(category,limit,skip) ;
        }catch(err:any){
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
        } 
    }
   
    public async getProducts(limit:number,skip:number):Promise<dataProducts[]>{
        try{
            return await this.product.getProducts(limit,skip);
        }catch(err:any){
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
        }
    }
    public async getProductById(id:number):Promise<dataProducts |null>{
        try{
            const datas = await this.product.getProductById(id);
            if(!datas)return null;
            return datas
        }catch(err:any){
            throw new ErrorMessage("Failed to retrieve products. Please try again later.", 500);
        }
    }
   
   
    public async countProducts():Promise<number>{
        try {
            const count =  await this.product.countProducts();
            if(count)return Number(count);

            return 0;
        } catch (err: any) {
            throw new ErrorMessage("Failed to count products in the database", 500);
        }

    }
   
 
    public async getProductsByStoreId(storeId:number,skip:number,limit:number):Promise<dataProducts[]>{
        try{
            return await this.product.getProductsByStoreId(storeId,skip,limit)
            
        }catch(err:any){
            return [];
        }
    }
    public async countProductStore(storeId:number):Promise<number>{
        try{
            return await this.product.countProductStore(storeId)
        }catch(err:any){
            return 0;
        }
    }
    public async deleteProduct(storeId:number,productId:number):Promise<void>{
        try{
            await this.product.deleteProduct(storeId,productId)
        }catch(err:any){
            throw new ErrorMessage("Failed to delete product",500);
        }
    }
}
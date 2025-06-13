import { dataProducts, IProductRepository, ProductRepository } from "../Repository/ProductRepository";

export interface productService{
    createProduct( data:{ name: string, description: string,
        storeId: number, price: number, stock: number, imageUrl: string }):Promise<void>
}
class ProductService  implements productService{
    constructor(protected product:IProductRepository){}

    public async createProduct( data: { name: string, description: string,
        storeId: number, price: number, 
        stock: number, imageUrl: string 
    }): Promise<void> {
        try{
            await this.product.createProduct( data )
        }catch(err:any){
             
        }
    }
}
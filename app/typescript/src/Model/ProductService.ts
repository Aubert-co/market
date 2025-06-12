import { IProductRepository, ProductRepository } from "../Repository/ProductRepository";

export interface productService{
    createProduct(name:string):Promise<void>
}
class ProductService {
    constructor(protected product:IProductRepository){}


}
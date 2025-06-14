import { Response ,Request} from "express";
import { productService } from "../Model/ProductService";

class CreateProductsController {
    constructor(protected products:productService ){}

    public async handler(req:Request,res:Response){
        
    }
}
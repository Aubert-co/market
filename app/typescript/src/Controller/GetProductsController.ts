import { Response ,Request} from "express";
import { productService } from "../Model/ProductService";

class GetProducts {
    constructor(protected products:productService ){}

    public async handler(req:Request,res:Response){
        
    }
}
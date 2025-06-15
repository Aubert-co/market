import { Response ,Request} from "express";
import { productService } from "../Services/ProductService";

class GetProducts {
    constructor(protected products:productService ){}

    public async handler(req:Request,res:Response){
        
    }
}
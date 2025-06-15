import { Response ,Request, NextFunction} from "express";
import { productService } from "../Services/ProductService";
import { ErrorMessage } from "../Helpers/ErrorMessage";
import { checkIsAValidCategory, checkIsAValidNumber, isAValidString } from "../Helpers";
import { checkIsValidImage, generateImgPath } from "../Helpers/checkIsValidImage";
import { uploadFileToGCS } from "../Repository/FileUpload";
import { StoreService } from "../Services/StoreService";

export class CreateProductsController {
    constructor(protected products:productService ,protected store:StoreService){}

    public async handler(req:Request,res:Response,next:NextFunction){
        if (
                !req.file ||
                !checkIsValidImage({
                    fileBuffer: req.file.buffer,
                    mimeType: req.file.mimetype,
                    originalFileName: req.file.originalname,
                })
                ) {
                throw new ErrorMessage("Invalid or missing image file.",422) 
            }
        
        if(!isAValidString(req.body.name)){
            throw new ErrorMessage("Invalid name. Please check and try again.",422)
            
        }
        if(!isAValidString(req.body.description , 200)){
            throw new ErrorMessage("Invalid description. Please check and try again.",422)
        }
        if (!checkIsAValidNumber(req.body.stock)) {
            throw new ErrorMessage("Invalid or missing stock value. Must be a non-negative number.", 422);
        }

        if (!checkIsAValidNumber(req.body.price)) {
            throw new ErrorMessage("Invalid or missing price value. Must be a non-negative number.", 422);
        }
        if(!isAValidString(req.body.category) ||!checkIsAValidCategory(req.body.category)){
            throw new ErrorMessage("Invalid category. Please check and try again.",422)
        }
        const userId = req.user;
        const {buffer,originalname,mimetype} = req.file
        const publicUrlStorage = generateImgPath(originalname)
        const {name,description,price,stock,storeId,category} = req.body
       try{
            const check = await this.store.checkOwnerShip(storeId,userId)
            if(!check) {
                throw new ErrorMessage("Validation failed. Please check your input.",400);
            }
            await this.products.createProduct({category,name,description,price,stock,storeId,imageUrl:publicUrlStorage})

            await uploadFileToGCS(buffer,originalname,mimetype)
       }catch(err:any){
        next(err)
       }
    }
}
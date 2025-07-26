import { PrismaClient } from "@prisma/client";

export class ViewRepository {
    constructor(protected prisma:PrismaClient){}

    public async addView(userId:number | null,productId:number){
        
        await this.prisma.view.create({
            data:{
                userId,productId
            }
        })
    }
    public async getViews(productId:number):Promise<any>{
        await this.prisma.product.findMany({
            where:{storeId:1},
            include:{
                _count:{
                    select:{views:true}
                }
            }
        })
    }
}
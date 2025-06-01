import { PrismaClient } from "@prisma/client"
import { ErrorMessage } from "../Helpers/ErrorMessage"


interface datas{
    id:number,
    name:string,
    password:string,
    email:string
}
export interface IUserRepository{
    findByEmail(email:string): Promise< Array<datas>>,
    create(datas:{email:string,password:string,name:string}):Promise<void>
  
}


export class UserRepository implements IUserRepository {
    protected prisma :PrismaClient
    constructor(prisma:PrismaClient){
        this.prisma = prisma
    }
    public async findByEmail(email:string):Promise< Array<datas> >{
    
        try{
            const user = await this.prisma.user.findUnique({
                where:{email}
            });
           
            return user ? [user] : [];
        }catch(err:any){
            throw new ErrorMessage('Failed to find an user',404);
        }
    }
    public async create(data:{email: string, password: string, name: string}): Promise<void> {
        try{
            await this.prisma.user.create({data})
        }catch(err:any){
            throw new ErrorMessage('Failed to create a new user',409)
        }
    }
   
}
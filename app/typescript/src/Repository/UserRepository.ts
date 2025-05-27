import { PrismaClient } from "@prisma/client"



export interface IUserRepository{
    findByEmail(email:string): Promise< boolean>,
    create(datas:{email:string,password:string,name:string}):Promise<void>
}


export class UserRepository implements IUserRepository {
    protected prisma :PrismaClient
    constructor(prisma:PrismaClient){
        this.prisma = prisma
    }
    public async findByEmail(email:string):Promise< boolean >{
    
        try{
            const user = await this.prisma.user.findUnique({
                where:{email}
            });
      
            if(user)return true;
            return false;
        }catch(err:any){
            throw new Error('Failed to find an user'+err);
        }
    }
    public async create(data:{email: string, password: string, name: string}): Promise<void> {
        try{
            await this.prisma.user.create({data})
        }catch(err:any){
            throw new Error('Failed to create a new user'+err)
        }
    }
}
import { PrismaClient } from "@prisma/client"
import { ErrorMessage } from "../Helpers/ErrorMessage"


export type User = {
    id:number,
    name:string,
    password:string,
    email:string
}
export interface IUserRepository{
    findByEmail(email:string): Promise< User | null>,
    createUserAccount(datas:{email:string,password:string,name:string}):Promise<void>
    findUserById(userId:number):Promise<User|null>
}


export class UserRepository implements IUserRepository {
  
    constructor(private prisma:PrismaClient){}
    public async findByEmail(email:string):Promise< User | null>{
        return await this.prisma.user.findUnique({
            where:{email}
        });
    }
    public async createUserAccount(data:{email: string, password: string, name: string}): Promise<void> {
        await this.prisma.user.create({data})
    }
    public async findUserById(userId:number):Promise<User|null>{
        return await this.prisma.user.findUnique({
            where:{id:userId}
        })
    }
   
}
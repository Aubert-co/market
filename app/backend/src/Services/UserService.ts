import { ErrorMessage } from "../Helpers/ErrorMessage";
import { IUserRepository, User } from "../Repository/UserRepository";

export interface IUserService  {
    findUserById(userId:number):Promise<User|null>,
    findByEmail(email:string):Promise<User|null>,
    createUserAccount({email,password,name}:ParamsCreate):Promise<void>
}
type ParamsCreate=  {
    email:string,
    password:string,
    name:string
}
export class UserService implements IUserService {
    constructor(protected user:IUserRepository){}
    public async findByEmail(email:string):Promise<User | null>{
        try{
            return await this.user.findByEmail(email)
            
        }catch(err:any){
            throw new ErrorMessage('Failed to find an user',404);
        }
    }
    public async createUserAccount({email,password,name}:ParamsCreate):Promise<void>{
        try{
            await this.user.createUserAccount({email,password,name})
        }catch(err:any){
            throw new ErrorMessage('Failed to create a new user',409)
        }
    }
    public async findUserById(userId:number):Promise<User|null>{
        try{
            return await this.user.findUserById(userId)
        }catch(err:any){
            throw new ErrorMessage('Failed to find a user',409)
        }
    }
}
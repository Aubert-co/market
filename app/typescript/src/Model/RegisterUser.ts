import { IUserRepository } from "../Repository/UserRepository";
import bcrypt from 'bcrypt'


interface registerUser {
    createUserAccount(email:string,name:string,password:string) : Promise<void>,

}
export class RegisterUser implements registerUser {
    protected userRepository:IUserRepository;
    constructor( userRepository :IUserRepository){
        this.userRepository = userRepository;
    }

    public async createUserAccount(email:string, name:string,password : string):Promise<void>{
        const userExists =await this.userRepository.findByEmail( email );
        if(userExists)throw new Error("User already exists");
        
        const hashedPassword =  await bcrypt.hash(password,10);

        await this.userRepository.create({email,name,hashedPassword});
    }
}
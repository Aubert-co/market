import { ErrorMessage } from "../Helpers/ErrorMessage";
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
        if( userExists.length >0)throw new ErrorMessage("User already exists",409);
    
        const hashedPassword =  await bcrypt.hash(password,10);

        await this.userRepository.create({email,name,password:hashedPassword});
    }
}
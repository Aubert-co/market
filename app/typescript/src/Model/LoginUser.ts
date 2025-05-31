import { IUserRepository } from "../Repository/UserRepository";
import bcrypt from 'bcrypt'

interface loginUser{
    login(email:string,password:string):Promise<number >
}
export class LoginUser implements loginUser{
    protected userRepository:IUserRepository;
    constructor(userRepository:IUserRepository){
        this.userRepository = userRepository
    }
    async login(email: string, password: string): Promise<number > {
        const userArray = await this.userRepository.findByEmail( email );
        if(userArray.length ===0)throw new Error("User not found");
        const [user] = userArray
        const hashedPassword = user.password
        
        const compare = await bcrypt.compare(password,hashedPassword)
        if(!compare)throw new Error("Invalid credentials")
        return user.id
    }
}
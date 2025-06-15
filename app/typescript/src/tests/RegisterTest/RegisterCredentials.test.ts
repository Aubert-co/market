import { RegisterCredentials } from "../../Services/RegisterCredentials";
import bcrypt from "bcrypt"

describe("RegisteerCretendials",()=>{
    const name ="lucas"
    const password ="12345678"
    const email = "lorem@gmail.com"
    const findByEmailMock = jest.fn()
    const createMock = jest.fn()
    const userRepository = {findByEmail:findByEmailMock,create:createMock}
    const MOCKED_HASH = "QJE1938OInewe"
    beforeEach(async()=>{
        jest.clearAllMocks()
        jest.spyOn(bcrypt,"hash").mockResolvedValue(MOCKED_HASH as never)
    })
    it("should throw an error if user already exists",async()=>{
         
        findByEmailMock.mockReturnValue([{id:0,name,email,password}])
        const register = new RegisterCredentials( userRepository )
        await expect(register.createUserAccount(email, name, password))
        .rejects.toThrow("User already exists");
        expect(findByEmailMock).toHaveBeenCalledWith(email)
        expect(createMock).toHaveBeenCalledTimes(0)
        expect(findByEmailMock).toHaveBeenCalledTimes(1)
        
    })
    it("should create a new user account successfully",async()=>{
     
        findByEmailMock.mockReturnValue([])
        createMock.mockReturnValue("")
        const register = new RegisterCredentials( userRepository )
  
        await register.createUserAccount(email,name,password)
        expect(findByEmailMock).toHaveBeenCalledWith(email)
        expect(findByEmailMock).toHaveReturnedTimes(1)
        expect(createMock).toHaveBeenCalledTimes(1)
        expect(createMock).toHaveBeenCalledWith({email,name,password:MOCKED_HASH})
       
    })
})
import { LoginCredentials } from "../../Services/LoginCredentials";
import bcrypt from "bcrypt"

describe("LoginCredentials",()=>{
    const name ="lucas"
    const password ="12345678"
    const email = "lorem@gmail.com"
    const findByEmailMock = jest.fn()
    const createMock = jest.fn()
    const userRepository = {findByEmail:findByEmailMock,create:createMock}
    let hashedPassword:string

    beforeEach(async()=>{
        jest.clearAllMocks()
        hashedPassword = await bcrypt.hash(password,10)
    })
   
    it("should throw an error when the user does not exist in the DB.",async()=>{ 
        findByEmailMock.mockReturnValue([])
        const login = new LoginCredentials( userRepository )

        await expect(login.auth(email,password)).rejects.toThrow("User not found")
        expect(findByEmailMock).toHaveBeenCalledTimes(1)
        expect(findByEmailMock).toHaveBeenCalledWith(email)
        expect(createMock).not.toHaveBeenCalled()
    })
    it("should log in a user when password are correct.",async()=>{ 
        findByEmailMock.mockReturnValue([{id:1,name,password:hashedPassword}])
        const login = new LoginCredentials( userRepository )
 
        await expect(login.auth(email,password)).resolves.toBe(1)
        expect(findByEmailMock).toHaveBeenCalledTimes(1)
        expect(findByEmailMock).toHaveBeenCalledWith(email)

        expect(createMock).not.toHaveBeenCalled()
    })  
     it("should throw an error when the password does not match.",async()=>{ 
        findByEmailMock.mockReturnValue([{id:1,name,password}])
        const login = new LoginCredentials( userRepository )

        await expect(login.auth(email,password)).rejects.toThrow("Invalid credentials")
        expect(findByEmailMock).toHaveBeenCalledTimes(1)
        expect(findByEmailMock).toHaveBeenCalledWith(email)

        expect(createMock).not.toHaveBeenCalled()
    })
}) 
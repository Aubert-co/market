import React from "react";
import { render,fireEvent, screen, waitFor, getAllByTestId } from "@testing-library/react";
import {createMemoryHistory} from "history";
import { Login } from "../../pages/login";
import '@testing-library/jest-dom'
import *as Services from "../../services"
import { Router } from  'react-router-dom'
import { MessageContext } from "../../Contexts";
import { setMessageParams,mockContextValue } from "../mocks";

var history;
const valueFormService = [
    {message:'error',status:500,token:''},
    {message:'sucess',status:200,token:"3ou4joqnejlqeh39"}
    
]
let count =0
let  navigate  
describe("Page Login",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
        jest.useFakeTimers()
        jest.spyOn(Services,'serviceLogin').mockResolvedValue(valueFormService[count])
        history = createMemoryHistory({ initialEntries: ['/login'] }); 

       
        render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={mockContextValue('','')}>
                    <Login />
                </MessageContext.Provider>
            </Router> 
        )
        
    })
    afterEach(()=>{
        count+=1
    })
    it("Should not log in a new user, save a token in local storage, or redirect the user to another page.",async()=>{
        const name = "lucas"
        const password = "password1"
       
       
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatpass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
       

        expect(type_form.textContent).toEqual('Login')
        
        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})

        fireEvent.click(btn_send);
        expect(localStorage.getItem('token')).toEqual(null);
        expect(history.location.pathname).toEqual('/login')
        await waitFor(() => {
            expect(setMessageParams).toHaveBeenCalledTimes(1)
            expect(setMessageParams).toHaveBeenCalledWith({content:'Algo deu errado'})
            expect(localStorage.getItem('token')).toEqual(null);
            expect(history.location.pathname).toEqual('/login')
        }, { timeout: 4000 });
        
    })
    it("Should successfully log in a new user, save a token in local storage, and redirect the user to another page.9",async()=>{
        const name = "lucas"
        const password = "password1"
       
       
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatpass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
     

        expect(type_form.textContent).toEqual('Login')

        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})

        fireEvent.click(btn_send)

        await waitFor(()=>{
            
            expect(localStorage.getItem('token')).toEqual(valueFormService[count].token)
        
        })
        await waitFor(()=>{
            expect(history.location.pathname).toEqual('/')
            expect(setMessageParams).toHaveBeenCalledTimes(1)
            expect(setMessageParams).toHaveBeenCalledWith({content:'Você fez login com sucesso, você será redirecionado'})
        },{timeout:4000})
    })
    
})
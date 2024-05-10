import React from "react";
import { render,fireEvent, screen, waitFor, getAllByTestId } from "@testing-library/react";
import {createMemoryHistory} from "history";
import { Login } from "../pages/login";
import '@testing-library/jest-dom'
import *as Services from "../services"
import { Router } from  'react-router-dom'

const valueFormService = [
    {message:'error',status:500,token:''},
    {message:'sucess',status:200,token:"3ou4joqnejlqeh39"}
    
]
let count =0
let  navigate = jest.fn() 
describe("Page Login",()=>{
    beforeEach(()=>{
        
        jest.useFakeTimers()
        jest.spyOn(Services,'serviceLogin').mockResolvedValue(valueFormService[count])
        const history = createMemoryHistory();
       
        render(
            <Router location={history.location} navigator={history}>
                    <Login navigate={navigate}/>
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
        const message = screen.getByTestId("message")

        expect(type_form.textContent).toEqual('Login')
        
        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})

        fireEvent.click(btn_send);
        
        await waitFor(() => {
            expect(message.textContent).toEqual('Algo deu errado');
            expect(localStorage.getItem('token')).toEqual(null);
            expect(navigate).not.toHaveBeenCalled()
        }, { timeout: 4000 });
        
    })
    it("Should successfully log in a new user, save a token in local storage, and redirect the user to another page.9",async()=>{
        const name = "lucas"
        const password = "password1"
       
       
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatpass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const message = screen.getByTestId("message")

        expect(type_form.textContent).toEqual('Login')

        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})

        fireEvent.click(btn_send)

        await waitFor(()=>{
            expect(message.textContent).toEqual('Você fez login com sucesso, você será redirecionado')
            expect(localStorage.getItem('token')).toEqual(valueFormService[count].token)
        
        })
        await waitFor(()=>{
            expect(navigate).toHaveBeenCalledWith('/')
            expect(navigate).toHaveBeenCalledTimes(1)
        },{timeout:4000})
    })
    
})
import React from "react";
import { render,fireEvent, screen, waitFor } from "@testing-library/react";
import {createMemoryHistory} from "history";
import '@testing-library/jest-dom'
import *as Services from "../../services"
import { Router } from  'react-router-dom'
import { MessageContext } from "../../Contexts";
import { setMessageParams,mockContextValue } from "../mocks";
import { Register } from "../../pages/register";


var history;

describe("Page Register",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
        jest.useFakeTimers()
        
    })
    it("When a user tries to register and the service returns success with a 200 status code",async()=>{
        jest.spyOn(Services,'serviceRegister').mockResolvedValue({message:'Você criou sua conta com sucesso, você será redirecionado',status:201})
        history = createMemoryHistory({ initialEntries: ['/Register'] }); 

       
        let {rerender} = render(
                <Router location={history.location} navigator={history}>
                    <MessageContext.Provider value={mockContextValue('','')}>
                        <Register />
                    </MessageContext.Provider>
                </Router> 
            )
            
            rerender(
                <Router location={history.location} navigator={history}>
                    <MessageContext.Provider value={mockContextValue("Você criou sua conta com sucesso, você será redirecionado",'')}>
                        <Register />
                    </MessageContext.Provider>
                </Router> 
            )
        const name = "lucas"
        const password = "password1"
        
        
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatpass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        

        expect(type_form.textContent).toEqual('Register')
        
        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})
        fireEvent.change(input_repeatpass,{target:{value:password}})
        fireEvent.click(btn_send);
        expect(localStorage.getItem('token')).toEqual(null);
        expect(history.location.pathname).toEqual('/Register')
        
        
        await waitFor(() => {
            expect(history.location.pathname).toBe("/login");
            expect(setMessageParams).toHaveBeenCalledTimes(1)
            expect(setMessageParams).toHaveBeenCalledWith({content:'Você criou sua conta com sucesso, você será redirecionado'})

        },{timeout:4000});
    })
    it("When a user tries to register and the service returns an error with a 500 status code",async()=>{
        jest.spyOn(Services,'serviceRegister').mockResolvedValue({message:'Algo deu errado!',status:500})
        history = createMemoryHistory({ initialEntries: ['/Register'] }); 

       
        let {rerender} = render(
                <Router location={history.location} navigator={history}>
                    <MessageContext.Provider value={mockContextValue('','')}>
                        <Register />
                    </MessageContext.Provider>
                </Router> 
            )
          
            rerender(
                <Router location={history.location} navigator={history}>
                    <MessageContext.Provider value={mockContextValue("Algo deu errado!",'')}>
                        <Register />
                    </MessageContext.Provider>
                </Router> 
            )
        const name = "lucas"
        const password = "password1"
        
        
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatpass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        

        expect(type_form.textContent).toEqual('Register')
        
        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})
        fireEvent.change(input_repeatpass,{target:{value:password}})
        fireEvent.click(btn_send);
        expect(localStorage.getItem('token')).toEqual(null);

        
        await waitFor(() => {
            expect(setMessageParams).toHaveBeenCalledTimes(1)
            expect(setMessageParams).toHaveBeenCalledWith({content:'Algo deu errado!'})
            expect(history.location.pathname).toEqual('/Register') }, { timeout: 5000 });
    })
    it("When a user tries to create an account but does not send a name",async()=>{
        jest.spyOn(Services,'serviceRegister').mockResolvedValue({message:'Algo deu errado!',status:500})
        history = createMemoryHistory({ initialEntries: ['/Register'] }); 

       
        let {rerender} = render(
                <Router location={history.location} navigator={history}>
                    <MessageContext.Provider value={mockContextValue('','')}>
                        <Register />
                    </MessageContext.Provider>
                </Router> 
            )
          
            rerender(
                <Router location={history.location} navigator={history}>
                    <MessageContext.Provider value={mockContextValue("Algo deu errado!",'')}>
                        <Register />
                    </MessageContext.Provider>
                </Router> 
            )
        const name = ""
        const password = "password1"
        
        
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatpass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        

        expect(type_form.textContent).toEqual('Register')
        
        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})
        fireEvent.change(input_repeatpass,{target:{value:password}})
        fireEvent.click(btn_send);
        expect(localStorage.getItem('token')).toEqual(null);

        
        await waitFor(() => {
            expect(setMessageParams).toHaveBeenCalledTimes(1)
            expect(setMessageParams).toHaveBeenCalledWith({content:'Nome muito curto!',type:'warning'})
            expect(history.location.pathname).toEqual('/Register') }, { timeout: 5000 });
    })
    it("When a user tries to create an account but does not send a password",async()=>{
        jest.spyOn(Services,'serviceRegister').mockResolvedValue({message:'Algo deu errado!',status:500})
        history = createMemoryHistory({ initialEntries: ['/Register'] }); 

       
        let {rerender} = render(
                <Router location={history.location} navigator={history}>
                    <MessageContext.Provider value={mockContextValue('','')}>
                        <Register />
                    </MessageContext.Provider>
                </Router> 
            )
          
            rerender(
                <Router location={history.location} navigator={history}>
                    <MessageContext.Provider value={mockContextValue("Algo deu errado!",'')}>
                        <Register />
                    </MessageContext.Provider>
                </Router> 
            )
        const name = "jeqweee"
        const password = ""
        
        
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatpass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        

        expect(type_form.textContent).toEqual('Register')
        
        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})
        fireEvent.change(input_repeatpass,{target:{value:password}})
        fireEvent.click(btn_send);
        expect(localStorage.getItem('token')).toEqual(null);

        
        await waitFor(() => {
            expect(setMessageParams).toHaveBeenCalledTimes(1)
            expect(setMessageParams).toHaveBeenCalledWith({content:'Senha muito curta!',type:'warning'})
            expect(history.location.pathname).toEqual('/Register') }, { timeout: 5000 });
    })
    it("When a user tries to create an account but the password and repeat password don't match",async()=>{
        jest.spyOn(Services,'serviceRegister').mockResolvedValue({message:'Algo deu errado!',status:500})
        history = createMemoryHistory({ initialEntries: ['/Register'] }); 

       
        let {rerender} = render(
                <Router location={history.location} navigator={history}>
                    <MessageContext.Provider value={mockContextValue('','')}>
                        <Register />
                    </MessageContext.Provider>
                </Router> 
            )
          
            rerender(
                <Router location={history.location} navigator={history}>
                    <MessageContext.Provider value={mockContextValue("Algo deu errado!",'')}>
                        <Register />
                    </MessageContext.Provider>
                </Router> 
            )
        const name = "jeqweee"
        const password = "12345567"
        const repeatPass = "123456789"
        
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatpass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        

        expect(type_form.textContent).toEqual('Register')
        
        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})
        fireEvent.change(input_repeatpass,{target:{value:repeatPass}})
        fireEvent.click(btn_send);
        expect(localStorage.getItem('token')).toEqual(null);

        
        await waitFor(() => {
            expect(setMessageParams).toHaveBeenCalledTimes(1)
            expect(setMessageParams).toHaveBeenCalledWith({content:'As senhas não concindem!',type:'warning'})
            expect(history.location.pathname).toEqual('/Register') }, { timeout: 5000 });
    })
})
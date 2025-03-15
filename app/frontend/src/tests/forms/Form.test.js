import React,{useState,useContext} from "react";
import { render,fireEvent, screen, waitFor } from "@testing-library/react";

import {Router} from 'react-router-dom'

import { createMemoryHistory } from "history";
import { Form } from "../../Components/Form";
import { MessageContext } from "../../Contexts";
import '@testing-library/jest-dom';
import { mockContextValue,setMessageParams } from "../mocks";

var DEFAULT_VALUES,event;

describe('FORM',()=>{
    afterEach(()=>{
 
        jest.clearAllMocks()
    })
    beforeEach(()=>{
        
        jest.useFakeTimers()
         DEFAULT_VALUES = {
            values:{name:'',password:''},
            setValues:jest.fn()
        }
    
        
    })
    it("When all the correct details are provided, it should successfully log in a user.",async()=>{
        const name = "lucas"
        const password = "password1"
        const history = createMemoryHistory();
         event =jest.fn(({name,password,setMessageParams})=>{
            DEFAULT_VALUES.setValues({name,password})
            setMessageParams({content:'Voce fez o login com sucesso!'})
        })
       let {rerender} = render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={mockContextValue('','')}>
                    <Form event={event} type={"Login"}/>
                </MessageContext.Provider>
            </Router> 
        )
        rerender(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={mockContextValue('Voce fez o login com sucesso!','')}>
                    <Form event={event} type={"Login"}/>
                </MessageContext.Provider>
            </Router> 
        )
        
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatpass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const linkToRegister =screen.getByTestId('link_register')
        const messageBox = screen.queryByTestId('message_box')
        expect(linkToRegister.textContent).toEqual('Não tem uma conta crie uma agora!')
        expect(linkToRegister).toHaveAttribute('href','/register')
        expect(type_form.textContent).toEqual('Login')
        expect(input_name).toBeInTheDocument()
        expect(input_password).toBeInTheDocument()
        expect(input_repeatpass).toBeUndefined()
        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})

        fireEvent.click(btn_send)
        expect(input_name).toHaveValue(name)
        expect(input_password).toHaveValue(password)
        
        expect(setMessageParams).toHaveBeenCalledWith({content:'Voce fez o login com sucesso!'})
        expect(event).toHaveBeenCalledTimes(1)
       await waitFor(()=>{
            expect(messageBox.textContent).toEqual('Voce fez o login com sucesso!')
       })
    })
    it("When a name shorter than 4 characters is submitted, it should return an error.",async()=>{
        const history = createMemoryHistory();
         event =jest.fn(({name,password,setMessageParams})=>{
            DEFAULT_VALUES.setValues({name,password})
            setMessageParams({content:content[point]})
        })
       let {rerender} = render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={mockContextValue('','')}>
                    <Form event={event} type={"Login"}/>
                </MessageContext.Provider>
            </Router> 
        )
        rerender(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={mockContextValue("Nome muito curto!",'')}>
                    <Form event={event} type={"Login"}/>
                </MessageContext.Provider>
            </Router> 
        )
        const name = "lu"
        const password = "pas"
        
        
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatPass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const messageBox = screen.queryByTestId('message_box')
        const linkToRegister =screen.getByTestId('link_register')

        expect(linkToRegister.textContent).toEqual('Não tem uma conta crie uma agora!')
        expect(linkToRegister).toHaveAttribute('href','/register')
        expect(type_form.textContent).toEqual('Login')
        expect(input_name).toBeInTheDocument()
        expect(input_password).toBeInTheDocument()
        expect(input_repeatPass).toBeUndefined()

        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})
      
        fireEvent.click(btn_send)
        expect(setMessageParams).toHaveBeenCalledWith({content:"Nome muito curto!",type:'warning'})
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual( "Nome muito curto!" )
       })
    })

    it("When a password shorter than 5 characters is submitted, it should return an error.",async()=>{
        const name = "lucas"
        const password = "pas"
        
        const history = createMemoryHistory();
         event =jest.fn(({name,password,setMessageParams})=>{
            DEFAULT_VALUES.setValues({name,password})
            setMessageParams({content:content[point]})
        })
       let {rerender} = render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={mockContextValue('','')}>
                    <Form event={event} type={"Login"}/>
                </MessageContext.Provider>
            </Router> 
        )
        rerender(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={mockContextValue("Senha muito curta!",'')}>
                    <Form event={event} type={"Login"}/>
                </MessageContext.Provider>
            </Router> 
        )
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatPass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const messageBox = screen.queryByTestId('message_box')
        const linkToRegister =screen.getByTestId('link_register')

        expect(linkToRegister.textContent).toEqual('Não tem uma conta crie uma agora!')
        expect(linkToRegister).toHaveAttribute('href','/register')
        expect(type_form.textContent).toEqual('Login')
        expect(input_name).toBeInTheDocument()
        expect(input_password).toBeInTheDocument()
        expect(input_repeatPass).toBeUndefined()

        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})
 
        fireEvent.click(btn_send)
        expect(setMessageParams).toHaveBeenCalledWith({content:'Senha muito curta!',type:'warning'})
        
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual('Senha muito curta!')
       })
    })
    it("When a name with invalid characters is submitted, it should return an error.",async()=>{
        const name = "lucas!!!"
        const password = "paswoord"
      
        const history = createMemoryHistory();
        event =jest.fn(({name,password,setMessageParams})=>{
           DEFAULT_VALUES.setValues({name,password})
           setMessageParams({content:content[point]})
       })
      let {rerender} = render(
           <Router location={history.location} navigator={history}>
               <MessageContext.Provider value={mockContextValue('','')}>
                   <Form event={event} type={"Login"}/>
               </MessageContext.Provider>
           </Router> 
       )
       rerender(
           <Router location={history.location} navigator={history}>
               <MessageContext.Provider value={mockContextValue("Nome inválido, digite apenas números e letras!",'')}>
                   <Form event={event} type={"Login"}/>
               </MessageContext.Provider>
           </Router> 
       )
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatPass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const messageBox = screen.queryByTestId('message_box')
        const linkToRegister =screen.getByTestId('link_register')

        expect(linkToRegister.textContent).toEqual('Não tem uma conta crie uma agora!')
        expect(linkToRegister).toHaveAttribute('href','/register')
        expect(type_form.textContent).toEqual('Login')
        expect(input_name).toBeInTheDocument()
        expect(input_password).toBeInTheDocument()
        expect(input_repeatPass).toBeUndefined()

        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})
 
        fireEvent.click(btn_send)
        expect(setMessageParams).toHaveBeenCalledWith({content:'Nome inválido, digite apenas números e letras!',type:'warning'})
        
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual('Nome inválido, digite apenas números e letras!')
       })
    })
    
})

describe("When the form type is register",()=>{
        afterEach(()=>{
      
            jest.clearAllMocks()
        })
        beforeEach(()=>{
             
            jest.useFakeTimers()
            DEFAULT_VALUES = {
               values:{name:'',password:''},
               setValues:jest.fn()
           }
       

        })
       it("When all the correct details are provided, it should successfully crate a new  user",async()=>{
        const name = "lucas"
        const password = "password1"
        const history = createMemoryHistory();
            event =jest.fn(({name,password,setMessageParams})=>{
            DEFAULT_VALUES.setValues({name,password})
            setMessageParams({content:'Cadastrado com sucesso'})
        })
        let {rerender} = render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={mockContextValue('','')}>
                    <Form event={event} type={"Register"}/>
                </MessageContext.Provider>
            </Router> 
        )
        rerender(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={mockContextValue('Cadastrado com sucesso','')}>
                    <Form event={event} type={"Register"}/>
                </MessageContext.Provider>
            </Router> 
        )
        
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatPass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const messageBox = screen.queryByTestId('message_box')
        const linkToRegister =screen.getByTestId('link_login')

        expect(linkToRegister.textContent).toEqual('Já tem uma conta faça login!')
        expect(linkToRegister).toHaveAttribute('href','/login')
        expect(type_form.textContent).toEqual('Register')
        expect(input_name).toBeInTheDocument()
        expect(input_password).toBeInTheDocument()
        expect(input_repeatPass).toBeInTheDocument()

        fireEvent.change(input_name,{target:{value:name}})
        fireEvent.change(input_password,{target:{value:password}})
        fireEvent.change(input_repeatPass,{target:{value:password}})
        fireEvent.click(btn_send)
        
        expect(setMessageParams).toHaveBeenCalledWith({content:'Cadastrado com sucesso'})
        expect(setMessageParams).toHaveBeenCalledTimes(1)
        expect(event).toHaveBeenCalledTimes(1)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual('Cadastrado com sucesso')
        })
    })
    

   
    it("When a password different from 'repeat password' is submitted, it should return an error.",async()=>{
        const history = createMemoryHistory();
        event =jest.fn(({name,password,setMessageParams})=>{
        DEFAULT_VALUES.setValues({name,password})
        setMessageParams({content:content[point]})
    })
        let {rerender} = render(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={mockContextValue('','')}>
                    <Form event={event} type={"Register"}/>
                </MessageContext.Provider>
            </Router> 
        )
        rerender(
            <Router location={history.location} navigator={history}>
                <MessageContext.Provider value={mockContextValue('As senhas não concindem!','')}>
                    <Form event={event} type={"Register"}/>
                </MessageContext.Provider>
            </Router> 
        )
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatPass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const messageBox = screen.queryByTestId('message_box')
        const linkToRegister =screen.getByTestId('link_login')

        expect(linkToRegister.textContent).toEqual('Já tem uma conta faça login!')
        expect(linkToRegister).toHaveAttribute('href','/login')
        expect(type_form.textContent).toEqual('Register')
        expect(input_name).toBeInTheDocument()
        expect(input_password).toBeInTheDocument()
        expect(input_repeatPass).toBeInTheDocument()

        fireEvent.change(input_name,{target:{value:'lucass'}})
        fireEvent.change(input_password,{target:{value:'password'}})
        fireEvent.change(input_repeatPass,{target:{value:'363geee'}})
        fireEvent.click(btn_send)
        
        
        expect(setMessageParams).toHaveBeenCalledWith({content:'As senhas não concindem!',type:'warning'})
        expect(setMessageParams).toHaveBeenCalledTimes(1)
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual('As senhas não concindem!')
        })
    })
   
   
})
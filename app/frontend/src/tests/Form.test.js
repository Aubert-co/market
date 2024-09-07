import React,{useState,useContext} from "react";
import { render,fireEvent, screen, waitFor } from "@testing-library/react";

import {Router} from 'react-router-dom'

import { createMemoryHistory } from "history";
import { Form } from "../Components/Form";
import { MessageContext } from "../Contexts";
import '@testing-library/jest-dom';
import { mockContextValue,setMessageParams } from "./mocks";

var DEFAULT_VALUES,event;
var content = ["Voce fez o login com sucesso","Nome muito curto","Senha muito curta","Nome inválido, digite apenas números e letras","Senha inválida, digite apenas números e letras","Cadastrado com sucesso","Nome muito curto","Senha muito curta","As senhas não concindem","Nome inválido, digite apenas números e letras","Senha inválida, digite apenas números e letras"]
var point = 0
describe('FORM',()=>{
    afterEach(()=>{
        point+=1
        jest.clearAllMocks()
    })
    beforeEach(()=>{
        
        jest.useFakeTimers()
         DEFAULT_VALUES = {
            values:{name:'',password:''},
            setValues:jest.fn()
        }
    
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
                <MessageContext.Provider value={mockContextValue(content[point],'')}>
                    <Form event={event} type={"Login"}/>
                </MessageContext.Provider>
            </Router> 
        )
    })
    it("When all the correct details are provided, it should successfully log in a user.",async()=>{
        const name = "lucas"
        const password = "password1"
       
        
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
        
        expect(setMessageParams).toHaveBeenCalledWith({content:content[point]})
        expect(event).toHaveBeenCalledTimes(1)
       await waitFor(()=>{
            expect(messageBox.textContent).toEqual(content[point])
       })
    })
    it("When a name shorter than 5 characters is submitted, it should return an error.",async()=>{
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
        expect(setMessageParams).toHaveBeenCalledWith({content:content[point],type:'warning'})
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual(content[point])
       })
    })

    it("When a password shorter than 5 characters is submitted, it should return an error.",async()=>{
        const name = "lucas"
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
        expect(setMessageParams).toHaveBeenCalledWith({content:content[point],type:'warning'})
        
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual(content[point])
       })
    })
    it("When a name with invalid characters is submitted, it should return an error.",async()=>{
        const name = "lucas!!!"
        const password = "paswoord"
      
       
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
        expect(setMessageParams).toHaveBeenCalledWith({content:content[point],type:'warning'})
        
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual(content[point])
       })
    })
    it("When a password with invalid characters is submitted, it should return an error.",async()=>{
        const name = "lucas"
        const password = "paswoord!!!!"
      
       
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
        expect(setMessageParams).toHaveBeenCalledWith({content:content[point],type:'warning'})
        
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual(content[point])
       })
    })
})

describe("FORM  Register",()=>{
        afterEach(()=>{
            point+=1
            jest.clearAllMocks()
        })
        beforeEach(()=>{
             
            jest.useFakeTimers()
            DEFAULT_VALUES = {
               values:{name:'',password:''},
               setValues:jest.fn()
           }
       
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
                   <MessageContext.Provider value={mockContextValue(content[point],'')}>
                       <Form event={event} type={"Register"}/>
                   </MessageContext.Provider>
               </Router> 
           )
        })
       it("When all the correct details are provided, it should successfully crate a new  user",async()=>{
        const name = "lucas"
        const password = "password1"
        
        
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
        
        expect(setMessageParams).toHaveBeenCalledWith({content:content[point]})
        expect(setMessageParams).toHaveBeenCalledTimes(1)
        expect(event).toHaveBeenCalledTimes(1)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual(content[point])
        })
    })
    it("When a name shorter than 5 characters is submitted, it should return an error.",async()=>{
        const name = "luec"
        const password = "password1"
       
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
        
      
        expect(setMessageParams).toHaveBeenCalledWith({content:content[point],type:'warning'})
        expect(setMessageParams).toHaveBeenCalledTimes(1)
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual(content[point])
        })
    })
   

    it("When a password shorter than 5 characters is submitted, it should return an error.",async()=>{
        const name = "lucas"
        const password = "pas"
       
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
        
        
        expect(setMessageParams).toHaveBeenCalledWith({content:content[point],type:'warning'})
        expect(setMessageParams).toHaveBeenCalledTimes(1)
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual(content[point])
        })
    })
    it("When a password different from 'repeat password' is submitted, it should return an error.",async()=>{
       
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
        
        
        expect(setMessageParams).toHaveBeenCalledWith({content:content[point],type:'warning'})
        expect(setMessageParams).toHaveBeenCalledTimes(1)
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual(content[point])
        })
    })
    it("When a name with invalid characters is submitted, it should return an error.",async()=>{
        const name = "luec$%111e"
        const password = "password1"
       
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
        
      
        expect(setMessageParams).toHaveBeenCalledWith({content:content[point],type:'warning'})
        expect(setMessageParams).toHaveBeenCalledTimes(1)
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual(content[point])
        })
    })
    it("When a password with invalid characters is submitted, it should return an error.",async()=>{
        const name = "lucas"
        const password = "password1&&###"
       
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
        
      
        expect(setMessageParams).toHaveBeenCalledWith({content:content[point],type:'warning'})
        expect(setMessageParams).toHaveBeenCalledTimes(1)
        expect(event).toHaveBeenCalledTimes(0)
        await waitFor(()=>{
            expect(messageBox.textContent).toEqual(content[point])
        })
    })
})
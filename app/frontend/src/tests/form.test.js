import React,{useState,useContext} from "react";
import { render,fireEvent, screen, waitFor } from "@testing-library/react";

import {Router} from 'react-router-dom'

import { createMemoryHistory } from "history";
import { Form } from "../components/form";
import '@testing-library/jest-dom'


var DEFAULT_VALUES,event;
var content = ["Voce fez o login com sucesso","Nome muito curto","Senha muito curta","Cadastrado com sucesso","Nome muito curto","Senha muito curta","As senhas não concindem"]
var point = 0
describe('FORM',()=>{
    afterEach(()=>{
        point+=1
    })
    beforeEach(()=>{
        jest.useFakeTimers()
         DEFAULT_VALUES = {
            values:{name:'',password:''},
            setValues:jest.fn()
        }
        jest.spyOn(React,'useState').mockReturnValue([DEFAULT_VALUES.values,DEFAULT_VALUES.setValues])
       
        const history = createMemoryHistory();
         event =jest.fn(({name,password,setMessage})=>{
            DEFAULT_VALUES.setValues({name,password})
            setMessage({content:content[point]})
        })
        render(
            <Router location={history.location} navigator={history}>
                    <Form event={event} type={"Login"}/>
            </Router> 
        )
    })
    it("When all the correct details are provided, it should successfully log in a user.",async()=>{
        const name = "lucas"
        const password = "password1"
       
       
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatpass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const message = screen.getByTestId("message")
        const linkToRegister =screen.getByTestId('link_register')

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
        
        await waitFor(()=>{
            expect(DEFAULT_VALUES.setValues).toHaveBeenCalledTimes(1)
            expect(DEFAULT_VALUES.setValues).toHaveBeenCalledWith({name,password})

            expect(message.textContent).toEqual(content[0])
        },{timeout:4000})

        await waitFor(()=>{
            expect(message.textContent).toEqual('')
        },{timeout:5001})
    })
    it("When a name shorter than 3 characters is submitted, it should return an error.",async()=>{
        const name = "lu"
        const password = "pas"
        
        
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatPass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const message = screen.getByTestId("message")
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
        
        await waitFor(()=>{
            expect(DEFAULT_VALUES.setValues).toHaveBeenCalledTimes(0)
            expect(DEFAULT_VALUES.setValues).not.toHaveBeenCalled()
            expect(event).not.toHaveBeenCalled()
            expect(message.textContent).toEqual(content[1])
        },{timeout:4000})

        await waitFor(()=>{
            expect(message.textContent).toEqual('')
        },{timeout:5001})
    })

    it("When a password shorter than 5 characters is submitted, it should return an error.",async()=>{
        const name = "lucas"
        const password = "pas"
      
       
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatPass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const message = screen.getByTestId("message")
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
        
        await waitFor(()=>{
            expect(DEFAULT_VALUES.setValues).toHaveBeenCalledTimes(0)
            expect(DEFAULT_VALUES.setValues).not.toHaveBeenCalled()
            expect(event).not.toHaveBeenCalled()
            expect(message.textContent).toEqual(content[2])
        },{timeout:4000})

        await waitFor(()=>{
            expect(message.textContent).toEqual('')
        },{timeout:5001})
    })
})

describe("FORM  Register",()=>{
        afterEach(()=>{
            point+=1
        })
        beforeEach(()=>{
            jest.useFakeTimers()

            DEFAULT_VALUES = {
                values:{name:'',password:''},
                setValues:jest.fn()
            }
            jest.spyOn(React,'useState').mockReturnValue([DEFAULT_VALUES.values,DEFAULT_VALUES.setValues])
           
            const history = createMemoryHistory();
            const event =({name,password,setMessage})=>{
                DEFAULT_VALUES.setValues({name,password})
                setMessage({content:content[point]})
            }
            render(
                <Router location={history.location} navigator={history}>
                        <Form event={event} type={"Register"}/>
                </Router> 
            )
        })
       it("When all the correct details are provided, it should successfully crate a new  user",async()=>{
        const name = "lucas"
        const password = "password1"
        
        
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatPass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const message = screen.getByTestId("message")
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
        
        await waitFor(()=>{
            expect(DEFAULT_VALUES.setValues).toHaveBeenCalledTimes(1)
            expect(DEFAULT_VALUES.setValues).toHaveBeenCalledWith({name,password})

            expect(message.textContent).toEqual(content[point])
            
        },{timeout:4000})

        await waitFor(()=>{
            expect(message.textContent).toEqual('')
        },{timeout:5001})
    })
    it("When a name shorter than 3 characters is submitted, it should return an error.",async()=>{
        const name = "lu"
        const password = "password1"
       
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatPass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const message = screen.getByTestId("message")
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
        
        await waitFor(()=>{
            expect(DEFAULT_VALUES.setValues).toHaveBeenCalledTimes(0)
            expect(DEFAULT_VALUES.setValues).not.toHaveBeenCalled()
            expect(event).not.toHaveBeenCalled()
            expect(message.textContent).toEqual(content[point])
        },{timeout:4000})

        await waitFor(()=>{
            expect(message.textContent).toEqual('')
        },{timeout:5001})
    })

    it("When a password shorter than 5 characters is submitted, it should return an error.",async()=>{
        const name = "lucas"
        const password = "pas"
       
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatPass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const message = screen.getByTestId("message")
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
        
        await waitFor(()=>{
            expect(DEFAULT_VALUES.setValues).toHaveBeenCalledTimes(0)
            expect(DEFAULT_VALUES.setValues).not.toHaveBeenCalled()
            expect(event).not.toHaveBeenCalled()
            expect(message.textContent).toEqual(content[point])
        },{timeout:4000})

        await waitFor(()=>{
            expect(message.textContent).toEqual('')
        },{timeout:5001})
    })
    it("When a password different from 'repeat password' is submitted, it should return an error.",async()=>{
       
        const type_form = screen.getByTestId('type_form')
        const [input_name,input_password,input_repeatPass] = screen.getAllByTestId("input")
        const btn_send = screen.getByTestId("btn_send")
        const message = screen.getByTestId("message")
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
        
        await waitFor(()=>{
            expect(DEFAULT_VALUES.setValues).toHaveBeenCalledTimes(0)
            expect(DEFAULT_VALUES.setValues).not.toHaveBeenCalled()
            expect(event).not.toHaveBeenCalled()
            expect(message.textContent).toEqual(content[point])
        },{timeout:4000})

        await waitFor(()=>{
            expect(message.textContent).toEqual('')
        },{timeout:5001})
    })
})
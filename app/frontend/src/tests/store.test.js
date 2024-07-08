import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../services"
import '@testing-library/jest-dom'

import { Store } from "../pages/store";
var mockSerivce;
describe('Store',()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
        jest.useFakeTimers()

    })
    it("When a user not have a store should show an ad with a form to create a new store, and the admin painel show not be in the dom",async()=>{
        mockSerivce =jest.spyOn(Services,'serviceStore').mockResolvedValue({ status: 401, datas: [] });
        render(<Store />);

     

        expect(mockSerivce).toHaveBeenCalledTimes(1);

        await waitFor(()=>{
            expect(screen.queryByTestId('show_storeForm')).toBeInTheDocument()
            expect(screen.queryByTestId('benefits')).toBeInTheDocument()
            expect(screen.queryByTestId('formCreate_store')).toBeInTheDocument()
            expect(screen.queryByTestId('admin-container')).not.toBeInTheDocument()
        })
        
     
    });
    it("When a user not have a store but he creates one a admin painel should apparece",async()=>{
        mockSerivce =jest.spyOn(Services,'serviceStore').mockResolvedValue({ status: 401, datas: [] });
        
        const {rerender} = render(<Store />);

        expect(mockSerivce).toHaveBeenCalledTimes(1);

        await waitFor(()=>{
            expect(screen.queryByTestId('show_storeForm')).toBeInTheDocument()
            expect(screen.queryByTestId('benefits')).toBeInTheDocument()
            expect(screen.queryByTestId('formCreate_store')).toBeInTheDocument()
            expect(screen.queryByTestId('admin-container')).not.toBeInTheDocument()
        })

        const mockServiceCreateStore = jest.spyOn(Services,'serviceCreateStore').mockReturnValue({status:201,message:'sucess'})
        mockSerivce = jest.spyOn(Services,'serviceStore').mockResolvedValue({ status: 201, datas: [1] });
        
        rerender(<Store/>)
        const name_store = screen.getByTestId('name_store')
        const description_store = screen.getByTestId('description_store')
        const category_store= screen.getByTestId('category_store')
        const img_store = screen.getByTestId('img_store')
        const btn_submit = screen.getByTestId('btn_submit')
       

        fireEvent.change(name_store, { target: { value: 'Minha Loja' } });
        fireEvent.change(description_store, { target: { value: 'Uma loja incrível' } });
        fireEvent.change(category_store, { target: { value: 'electronics' } });
        fireEvent.change(img_store, { target: { files: [new File(['dummy content'], 'example.png', { type: 'image/png' })] } });

        expect(name_store.value).toBe('Minha Loja');
        expect(description_store.value).toBe('Uma loja incrível');
        expect(category_store.value).toBe('electronics');
        expect(img_store.files[0].name).toBe('example.png');
        
        fireEvent.click(btn_submit)
        
        await waitFor(()=>{
            expect(screen.queryByTestId('message').textContent).toEqual('Sua loja foi criada com sucesso!')
        })
        await waitFor(()=>{
            expect(screen.queryByTestId('box_store')).toBeInTheDocument()
            expect(mockServiceCreateStore).toHaveBeenCalledTimes(1)
            
            const formData = mockServiceCreateStore.mock.calls[0][0];
            expect(formData.get('name')).toBe('Minha Loja');
            expect(formData.get('description')).toBe('Uma loja incrível');
            expect(formData.get('category')).toBe('electronics');
            expect(formData.get('file').name).toBe('example.png');
            expect(screen.queryByTestId('show_storeForm')).not.toBeInTheDocument()
            expect(screen.queryByTestId('benefits')).not.toBeInTheDocument()
            expect(screen.queryByTestId('formCreate_store')).not.toBeInTheDocument()
            expect(screen.queryByTestId('admin-container')).toBeInTheDocument()
        
        },{timeout:4000})
    })
})
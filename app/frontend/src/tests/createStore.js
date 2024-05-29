import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../services"
import '@testing-library/jest-dom'
import { CreateStore } from "../components/CreateStore";


describe('CreateStore',()=>{
    beforeEach(()=>{
        jest.useFakeTimers()
    })
    it("When not send a name , image,caroty and description should return a error",async()=>{
        const service = jest.spyOn(Services,'serviceCreateStore').mockReturnValue({status:201,message:'sucess'})
        const setShowCreate = jest.fn()
        render(
            <CreateStore setShowCreate={setShowCreate}/>
        )
        const btn_submit = screen.getByTestId('btn_submit')
        fireEvent.click(btn_submit)
        
        expect(service).toHaveBeenCalledTimes(0)
        expect(screen.getByTestId('message').textContent).toEqual('Os campos nome , descrição , categoria e imagem são obrigatorios')
        await waitFor(()=>{
            expect(screen.queryByTestId('message').textContent).toEqual("")
        },{timeout:5001})

    })
    it("When not send a name , image,caroty and description should return sucess",async()=>{
        const service = jest.spyOn(Services,'serviceCreateStore').mockReturnValue({status:201,message:'sucess'})
        const setShowCreate = jest.fn()
        render(
            <CreateStore setShowCreate={setShowCreate}/>
        )
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
        expect(screen.queryByTestId('message').textContent).toEqual("")
        expect(service).toHaveBeenCalledTimes(1)


        await waitFor(() => {
            expect(screen.queryByTestId('message').textContent).toEqual('Sua loja foi criada com sucesso!')
            const formData = service.mock.calls[0][0];
            expect(formData.get('name')).toBe('Minha Loja');
            expect(formData.get('description')).toBe('Uma loja incrível');
            expect(formData.get('category')).toBe('electronics');
            expect(formData.get('image').name).toBe('example.png');
        });

        await waitFor(()=>{
            expect(screen.queryByTestId('message').textContent).toEqual("")
            expect(setShowCreate).toHaveBeenCalledWith(false)
            expect(setShowCreate).toHaveBeenCalledTimes(1)
        },{timeout:5001})

    })
})
import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../services"
import '@testing-library/jest-dom'
import { FormCreateStore } from "../components/FormCreateStore";
import { MessageContext } from "../contexts";
var mockFormRef;

describe('FormCreateStore',()=>{
    beforeEach(()=>{
        jest.useFakeTimers()
        mockFormRef = jest.fn()
        jest.clearAllMocks()
    })
    it("When a name, image, category, or description is not sent, it should return an a boxmessage with an error message",async()=>{
   
        const service = jest.spyOn(Services, 'serviceCreateStore').mockResolvedValue({ status: 201 });
        const setShowCreate = jest.fn();
    
        let mockContextValue = {
            messageParams: { content: '', type: '' },
            setMessageParams: jest.fn(),
        };
    
        const { rerender } = render(
            <MessageContext.Provider value={mockContextValue}>
                <FormCreateStore formRef={{ current: null }} setShowCreate={setShowCreate} />
            </MessageContext.Provider>
        );
    
     
        const btnSubmit = screen.getByTestId('btn_submit');
        fireEvent.click(btnSubmit);
    
       
        expect(mockContextValue.setMessageParams).toHaveBeenCalledWith({
            content: 'Os campos nome , descrição , categoria e imagem são obrigatorios',
            type: 'error',
        });
        expect(mockContextValue.setMessageParams).toHaveBeenCalledTimes(1);
    
       
        mockContextValue = {
            messageParams: {
                content: 'Os campos nome , descrição , categoria e imagem são obrigatorios',
                type: 'error',
            },
            setMessageParams: jest.fn(),
        };
    
        rerender(
            <MessageContext.Provider value={mockContextValue}>
                <FormCreateStore formRef={{ current: null }} setShowCreate={setShowCreate} />
            </MessageContext.Provider>
        );
    
      
        await waitFor(() => {
            expect(screen.getByTestId('message_content')).toHaveTextContent(
                'Os campos nome , descrição , categoria e imagem são obrigatorios'
            );
        });
    })
    it.only("When all fields are sent correctly,should return success.",async()=>{
        const service = jest.spyOn(Services,'serviceCreateStore').mockReturnValue({status:201,message:'sucess'})
        const setShowCreate = jest.fn();
    
        let mockContextValue = {
            messageParams: { content: '', type: '' },
            setMessageParams: jest.fn(),
        };
    
     
       let {rerender} = render(
            <MessageContext.Provider value={mockContextValue}>
                <FormCreateStore formRef={{ current: null }} setShowCreate={setShowCreate} />
            </MessageContext.Provider>
        );
        const name_store = screen.getByTestId('name_store')
        const description_store = screen.getByTestId('description_store')
        const category_store= screen.getByTestId('category_store')
        const img_store = screen.getByTestId('img_store')
        const btn_submit = screen.getByTestId('btn_submit')

        fireEvent.change(name_store, { target: { value: 'Minha Loja' } });
        fireEvent.change(description_store, { target: { value: 'Uma loja incrível' } });
        fireEvent.change(category_store, { target: { value: 'electronics' } });
        fireEvent.change(img_store, { target: { files: [new File(['dummy content'], 'example.png', { type: 'image/png' })] } });

            
        mockContextValue = {
            messageParams: {
                content: 'Sua loja foi criada com sucesso!',
                type: 'sucess',
            },
            setMessageParams: jest.fn(),
        };
    
        rerender(
            <MessageContext.Provider value={mockContextValue}>
                <FormCreateStore formRef={{ current: null }} setShowCreate={setShowCreate} />
            </MessageContext.Provider>
        );
        expect(name_store.value).toBe('Minha Loja');
        expect(description_store.value).toBe('Uma loja incrível');
        expect(category_store.value).toBe('electronics');
        expect(img_store.files[0].name).toBe('example.png');
        
        fireEvent.click(btn_submit)
      
        expect(service).toHaveBeenCalledTimes(1)


        await waitFor(() => {
            expect(screen.queryByTestId('message_content').textContent).toEqual('Sua loja foi criada com sucesso!')
            const formData = service.mock.calls[0][0];
            expect(formData.get('name')).toBe('Minha Loja');
            expect(formData.get('description')).toBe('Uma loja incrível');
            expect(formData.get('category')).toBe('electronics');
            expect(formData.get('file').name).toBe('example.png');
        });

        await waitFor(()=>{
            expect(screen.queryByTestId('message_content')).not.toBeInTheDocument()
            expect(setShowCreate).toHaveBeenCalledWith(false)
            expect(setShowCreate).toHaveBeenCalledTimes(1)
        },{timeout:5001})

    })
    it("When all fields are sent correctly and the user is not logged in, it should return an error message.",async()=>{
        const service = jest.spyOn(Services,'serviceCreateStore').mockReturnValue({status:401,message:'sucess'})
        const setShowCreate = jest.fn()
        render(
            <FormCreateStore formRef={mockFormRef} setShowCreate={setShowCreate}/>
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
            expect(screen.queryByTestId('message').textContent).not.toEqual('Sua loja foi criada com sucesso!')
            expect(screen.queryByTestId('message').textContent).toEqual('Você precisá logar para criar uma loja!')
            const formData = service.mock.calls[0][0];
            expect(formData.get('name')).toBe('Minha Loja');
            expect(formData.get('description')).toBe('Uma loja incrível');
            expect(formData.get('category')).toBe('electronics');
            expect(formData.get('file').name).toBe('example.png');
        });

        await waitFor(()=>{
            expect(screen.queryByTestId('message').textContent).toEqual("")
            expect(setShowCreate).toHaveBeenCalledTimes(0)
        },{timeout:5001})

    })
    it("When all data is sent correctly but the backend returns an error.",async()=>{
        const service = jest.spyOn(Services,'serviceCreateStore').mockReturnValue({status:501,message:'sucess'})
        const setShowCreate = jest.fn()
        render(
            <FormCreateStore formRef={mockFormRef} setShowCreate={setShowCreate}/>
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
            expect(screen.queryByTestId('message').textContent).not.toEqual('Sua loja foi criada com sucesso!')
            expect(screen.queryByTestId('message').textContent).toEqual('Algo deu errado ao criar sua loja!')
            const formData = service.mock.calls[0][0];
            expect(formData.get('name')).toBe('Minha Loja');
            expect(formData.get('description')).toBe('Uma loja incrível');
            expect(formData.get('category')).toBe('electronics');
            expect(formData.get('file').name).toBe('example.png');
        });

        await waitFor(()=>{
            expect(screen.queryByTestId('message').textContent).toEqual("")
            expect(setShowCreate).toHaveBeenCalledTimes(0)
        },{timeout:5001})

    })
})
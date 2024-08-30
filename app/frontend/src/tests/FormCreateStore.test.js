import React from "react";
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import  *as Services from "../services"
import '@testing-library/jest-dom'
import { FormCreateStore } from "../Components/Store/FormCreateStore";
import { MessageContext } from "../Contexts";
import * as Router from "react-router";
let navigate,setShowCreate;
import { setMessageParams,mockContextValue } from "./mocks";



describe('FormCreateStore',()=>{
    beforeEach(()=>{
        jest.useFakeTimers()
      
        jest.clearAllMocks()
        navigate = jest.fn()
      
        jest.spyOn(Router, 'useNavigate').mockImplementation(() => navigate)
      
        setShowCreate = jest.fn();
    })
    it("When a name, image, category, or description is not sent, it should return an a boxmessage with an error message",async()=>{
   
        const service = jest.spyOn(Services, 'serviceCreateStore').mockResolvedValue({ status: 403 });
        
       
        const { rerender } = render(
            <Router.MemoryRouter initialEntries={['/current']}>
            <MessageContext.Provider value={mockContextValue('','')}>
                <FormCreateStore formRef={{ current: null }} setShowCreate={setShowCreate} />
            </MessageContext.Provider>
        </Router.MemoryRouter>
        );
    
        const btnSubmit = screen.getByTestId('btn_submit');
        fireEvent.click(btnSubmit);
        expect(setMessageParams).toHaveBeenCalledWith({
            content: 'Os campos nome , descrição , categoria e imagem são obrigatorios',
            type: 'warning',
        });
        expect(setMessageParams).toHaveBeenCalledTimes(1);
        expect(service).toHaveBeenCalledTimes(0)
       
        const context = mockContextValue('Os campos nome , descrição , categoria e imagem são obrigatorios','warning') 
        rerender(
            <MessageContext.Provider value={context}>
                <FormCreateStore formRef={{ current: null }} setShowCreate={setShowCreate} />
            </MessageContext.Provider>
        );
    
      
        await waitFor(() => {
            expect(screen.getByTestId('message_content')).toHaveTextContent(
                'Os campos nome , descrição , categoria e imagem são obrigatorios'
            );
            expect(setMessageParams).toHaveBeenCalledWith({content:'Os campos nome , descrição , categoria e imagem são obrigatorios',type:'warning'})
            expect(setMessageParams).toHaveBeenCalledTimes(1)
        });
    })
    it("When all fields are sent correctly,should return success.",async()=>{
        const service = jest.spyOn(Services,'serviceCreateStore').mockReturnValue({status:201,message:'sucess'})
       

       let {rerender} = render(
        <Router.MemoryRouter initialEntries={['/current']}>
            <MessageContext.Provider value={mockContextValue('','')}>
                <FormCreateStore formRef={{ current: null }} setShowCreate={setShowCreate} />
            </MessageContext.Provider>
        </Router.MemoryRouter>
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
        fireEvent.click(btn_submit)

        await waitFor(()=>{
            expect(setMessageParams).toHaveBeenCalledTimes(1)
            expect(setMessageParams).toHaveBeenCalledWith({content:'Sua loja foi criada com sucesso!',type:'success'})
        })

        expect(service).toHaveBeenCalledTimes(1)
        
        expect(name_store.value).toBe('Minha Loja');
        expect(description_store.value).toBe('Uma loja incrível');
        expect(category_store.value).toBe('electronics');
        expect(img_store.files[0].name).toBe('example.png');

        const formData = service.mock.calls[0][0];
        expect(formData.get('name')).toBe('Minha Loja');
        expect(formData.get('description')).toBe('Uma loja incrível');
        expect(formData.get('category')).toBe('electronics');
        expect(formData.get('file').name).toBe('example.png');

        const context = mockContextValue('Sua loja foi criada com sucesso!','sucess')
      
        rerender(
            <MessageContext.Provider value={context}>
                <FormCreateStore formRef={{ current: null }} setShowCreate={setShowCreate} />
            </MessageContext.Provider>
        );
        await waitFor(() => {
            expect(screen.queryByTestId('message_content').textContent).toEqual('Sua loja foi criada com sucesso!')
         
        });

    })
    it("When all fields are sent correctly and the user is not logged in, it should return an error message.",async()=>{
        const service = jest.spyOn(Services,'serviceCreateStore').mockReturnValue({status:401,message:'error'})
       
       let {rerender} = render(
            <Router.MemoryRouter initialEntries={['/current']}>
            <MessageContext.Provider value={mockContextValue('','')}>
                <FormCreateStore formRef={{ current: null }} setShowCreate={setShowCreate} />
            </MessageContext.Provider>
        </Router.MemoryRouter>
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
        fireEvent.click(btn_submit)
        expect(service).toHaveBeenCalledTimes(1)
 
        await waitFor(()=>{
            expect(setMessageParams).toHaveBeenCalledTimes(1)
            expect(setMessageParams).toHaveBeenCalledWith({content:'Você precisá logar para criar uma loja!',type:'error'})
        })
      
        const context = mockContextValue('Você precisá logar para criar uma loja!','error')
                
        rerender(
            <MessageContext.Provider value={context}>
                <FormCreateStore formRef={{ current: null }} setShowCreate={setShowCreate} />
            </MessageContext.Provider>
        );
        expect(name_store.value).toBe('Minha Loja');
        expect(description_store.value).toBe('Uma loja incrível');
        expect(category_store.value).toBe('electronics');
        expect(img_store.files[0].name).toBe('example.png');
        
      
        await waitFor(() => {
            expect(screen.queryByTestId('message_content').textContent).toEqual('Você precisá logar para criar uma loja!')
            const formData = service.mock.calls[0][0];
            expect(formData.get('name')).toBe('Minha Loja');
            expect(formData.get('description')).toBe('Uma loja incrível');
            expect(formData.get('category')).toBe('electronics');
            expect(formData.get('file').name).toBe('example.png');
        });
        await waitFor(()=>{
            expect(navigate).toHaveBeenCalledWith('/login');
        },{timeout:4000})
    })
    it("When all data is sent correctly but the backend returns an error.",async()=>{
        const service = jest.spyOn(Services,'serviceCreateStore').mockReturnValue({status:501,message:'sucess'})
      
    
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
                content: 'Algo deu errado ao criar sua loja!',
                type: 'error',
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
            expect(screen.queryByTestId('message_content').textContent).toEqual('Algo deu errado ao criar sua loja!')
            const formData = service.mock.calls[0][0];
            expect(formData.get('name')).toBe('Minha Loja');
            expect(formData.get('description')).toBe('Uma loja incrível');
            expect(formData.get('category')).toBe('electronics');
            expect(formData.get('file').name).toBe('example.png');
        });
    })
})
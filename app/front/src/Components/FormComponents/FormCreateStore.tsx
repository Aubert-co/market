import { useRef } from "react"
import { serviceCreateStore } from "../../Services/StoreServices"
import { getValidImageFile, isAValidString } from "../../Utils/checkIsValid"
import { getMultiInputValues } from "../../Utils"
import { useMessage } from "../../Context/MessageContext"
import { StyleBtn, UserFormStyles } from "../../Styles/Form"
import { InputWithLabel } from "./InputWithLabel"
import { BoxMessage } from "../BoxMessages"

export type PropsFormCreateStore = {
    formRef: React.RefObject<HTMLInputElement | null>,
    handleStoreCreated:()=>void
}
export const FormCreateStore = ({formRef,handleStoreCreated}:PropsFormCreateStore)=>{
    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const imageRef = useRef<HTMLInputElement>(null);
    const {setMessage} = useMessage()
    const submit = async()=>{
        let [name,description] = getMultiInputValues(nameRef,descriptionRef)
        
         if(!isAValidString(name) ){
            setMessage({content:'Digite um nome válido',type:'info'})
            return
        };
        if(!isAValidString(description,200) ){
            setMessage({content:'Digite uma descrição válida até 200 letras',type:'info'})
            return
        };
        
        const file = getValidImageFile(imageRef);
       
        if(!file){
            setMessage({content:'Adicione uma imagem válida',type:'info'})
            return
        }
        const {status} = await serviceCreateStore({name,description,image:file})
        if(status === 201){
            setMessage({content:'Loja criada com sucesso!',type:'success'});
            handleStoreCreated()
            return
        }
        if(status === 422){
            setMessage({content:'Falha ao criar a loja. Certifique-se de que a imagem é válida',type:'error'})
            return
        }
        if(status === 409){
            setMessage({content:'Já existe uma loja com esse nome, tente outro',type:'info'})
            return
        }
        if(status > 422){
            setMessage({content:'Algo deu errado ao criar a sua loja!',type:'error'})
            return
        }
    }
    return (
        <UserFormStyles>
            <div className="form" ref={formRef}>
                <BoxMessage/>
                <h1 className="type_form">Criar Loja!</h1>
                <InputWithLabel inputName={"store_name"} textLabel="É assim que seus clientes verão sua loja.">
                    <input ref={nameRef} placeholder="Ex: EletronicArts" minLength={3} maxLength={15} type="text" id="store_name"/>
                </InputWithLabel>
                <InputWithLabel textLabel="O que torna sua loja especial? Conte aqui!" inputName="store_description">
                     <textarea placeholder="Ex: Produtos eletrônicos diversos" maxLength={200} minLength={10} ref={descriptionRef} name="store_description" ></textarea>
                </InputWithLabel>
                <InputWithLabel textLabel="Mostre o visual da sua loja com uma boa imagem" inputName="store_image">
                    <input ref={imageRef} type="file" id="store_image" accept="image/*" />
                </InputWithLabel>
                <StyleBtn onClick={submit}>Enviar</StyleBtn>

            </div>
        </UserFormStyles>
    )
}
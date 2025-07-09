import { useRef } from "react"
import { categories } from "../../Constants"
import { getMultiInputValues } from "../../Utils"
import { checkIsAValidCategory, checkIsAValidNumber, isAValidString } from "../../Utils/checkIsValid"
import { UserFormStyles } from "../../Styles/Form"
import { InputWithLabel } from "../../Components/FormComponents/InputWithLabel"
import { BoxMessage } from "../../Components/BoxMessages"
import { useMessage } from "../../Context/MessageContext"

export const CreateProduct = ()=>{
    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const imageRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null)
    const stockRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)
    const {setMessage} = useMessage()
    const submit = async()=>{
        const [name,description,price,stock,category] = getMultiInputValues(
            nameRef,descriptionRef,priceRef,stockRef,categoryRef
        );
        if(!isAValidString(name)){
            setMessage({content:'Digite um nome válido',type:'info'})
            return;
        }
        if(!isAValidString(description,199)){
            setMessage({content:'Digite uma descrição válida',type:'info'})
            return;
        }
        if(!checkIsAValidNumber(price)){
            setMessage({content:'Digite um preço válido, apenas números',type:'info'})
            return;
        }
        if(!checkIsAValidNumber(stock)){
            setMessage({content:'Digite um estoque válido , apenas números',type:'info'})
            return
        }
        if(!checkIsAValidCategory(category)){
            setMessage({content:'Selecione uma cátegoria',type:'info'})
            return
        }

    }
    return(
        <UserFormStyles>
            <div className="form">
                <h1 className="type_form">Criar produto</h1>
                <BoxMessage/>
                <InputWithLabel inputName="product_name" textLabel="Defina um nome que ajude os clientes a encontrarem seu produto">
                    <input placeholder="Ex: camisa polo" className="input-form"
                    ref={nameRef} 
                    id="product_name"
                    maxLength={15} 
                    type="text" />
                </InputWithLabel>

                <InputWithLabel inputName="image" textLabel="Imagem do produto:">
                    <input className="input-form"
                        ref={imageRef} 
                        type="file" 
                        id="image"  />
                </InputWithLabel>

                <InputWithLabel inputName="description" textLabel="Descrição do produto" >
                     <textarea placeholder="Ex: uma camisa para eventos..."
                        className="input-form" 
                        ref={descriptionRef} 
                        id="description" 
                        maxLength={199}
                        />
                </InputWithLabel>

                <InputWithLabel textLabel="Digite o preço do seu produto" inputName="price">
                    <input 
                    placeholder="Ex: 19.99"
                    className="input-form" 
                    ref={priceRef} 
                    type="number" 
                    id="price"/>
                </InputWithLabel>

                <InputWithLabel textLabel="Digite a quantidade de produtos" inputName="stock">
                    <input 
                    placeholder="Ex: 10" 
                    className="input-form"
                    ref={stockRef} 
                    type="number" 
                    id="stock"/>
                </InputWithLabel>
                
                <InputWithLabel textLabel="Selecione a categoria que mais representa o seu produto" inputName="category">
                    <select ref={categoryRef} id="category" >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                        {category}
                        </option>
                    ))}
                </select>
                </InputWithLabel>
                  <BoxMessage/>
                <button onClick={submit}>Enviar</button>
              
            </div>
        </UserFormStyles>
    )    
}
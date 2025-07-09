
import { adLinkStore, adTextStore, benefitsCreateStore } from "../../Constants/BenefitsRegister";
import { StyleCreateStore } from "../../Styles/RegisterPage";
import { BoxBenefits } from "../BoxBenefits";
import type { PropsFormCreateStore } from "../FormComponents/FormCreateStore";
import { FormCreateStore } from "../FormComponents/FormCreateStore";

type Props =PropsFormCreateStore & {
    showForm:boolean;
    storeLenght:number
}
export const BoxCreateStore = ({formRef,setShowForm,showForm,storeLenght}:Props)=>{

    return(
        <StyleCreateStore>
            {storeLenght === 0 && 
            <BoxBenefits 
                formRef={formRef} 
                adText={adTextStore} 
                adLink={adLinkStore} 
                benefits={benefitsCreateStore}/>}

            {showForm && <FormCreateStore formRef={formRef} setShowForm={setShowForm}/>}
        </StyleCreateStore>
    );
}

import { adLinkStore, adTextStore, benefitsCreateStore } from "../../Constants/BenefitsRegister";
import { StyleCreateStore } from "../../Styles/RegisterPage";
import { BoxBenefits } from "../BoxBenefits";
import type { PropsFormCreateStore } from "../FormComponents/FormCreateStore";
import { FormCreateStore } from "../FormComponents/FormCreateStore";

type Props =PropsFormCreateStore & {
   handleStoreCreated:()=>void
}
export const BoxCreateStore = ({formRef,handleStoreCreated}:Props)=>{

    return(
        <StyleCreateStore>
            
            <BoxBenefits 
                formRef={formRef} 
                adText={adTextStore} 
                adLink={adLinkStore} 
                benefits={benefitsCreateStore}/>
            

            <FormCreateStore formRef={formRef} handleStoreCreated={handleStoreCreated}/>
        </StyleCreateStore>
    );
}
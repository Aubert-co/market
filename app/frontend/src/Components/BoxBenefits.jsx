import React from "react";
import storeImg from '../Assets/store.png';

export const ListBenefits = ({benefits,scrollToForm})=>{

    return   benefits.map(({title,img,content},ind)=>{
        return <div key={ind}  className="benefit-box" onClick={scrollToForm}>
            {img &&<img src={img}></img>}
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    });
 
};

export const BoxBenefits = ({adText,adLink,benefits,formRef})=>{
    
  
    const scrollToForm = () => {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };
   
    return(
        <>
        <div className="main-container" data-testid="show_storeForm">
            <div className="header">
                <div className="header-content">
                    <img src={storeImg} alt="Loja" className="header-image" />
                    <h1>{adText}</h1>
                    <p style={{cursor:"pointer"}} onClick={scrollToForm}>{adLink}</p>
                </div>
            </div>
            <div className="benefits" data-testid="benefits">
                <h2>Benefícios</h2>
                <div className="benefits-container">
                    <ListBenefits scrollToForm={scrollToForm} benefits={benefits} />
                </div>
            </div>
        </div>
        
    </>
    )
};

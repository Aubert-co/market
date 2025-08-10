import { Container } from "@/Components/Container";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import orderhistory from '@/Assets/orderhistory.png'
import couponImg from '@/Assets/coupon.png'
import cartImg from '@/Assets/cart.png'
import storeImg from '@/Assets/store2.png'
import { UserCoupons } from "@/Components/Profile/UserCoupons";
import { Cart } from "../Components/Profile/UserCart";
import { UserStore } from "@/Components/Profile/UserStore";
import { useEffect, useRef } from "react";

const ProfileStyle = styled.div`
.boxes{
  justify-self:center;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px;
  margin: 32px 0;
 
  width:80%;
}


.box {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 7px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: auto;
  height:auto;
  max-width:160px;
  margin:1%
}

.box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.box img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 2px; /* Pequeno espaço entre imagem e texto */
}

.box p {
  font-size: 14px;
  color: #111; /* Texto mais escuro */
  font-weight: 600;
  text-align: center;
  margin: 2px 0 0 0; /* Margem superior pequena, sem margem embaixo */
}


`
export const Profile = () => {
  const redirect = useNavigate()
  const {action} = useParams()
  const goToForm = useRef<HTMLInputElement>(null)
  
  
  const scrollToForm = () => {
    if (goToForm.current) {
      goToForm.current.scrollIntoView({
        behavior: 'smooth',
        block:"nearest"
      });
    }
  };

    useEffect(() => {
      const timeout = setTimeout(() => {
      if (action && goToForm.current) {
        goToForm.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100); 

      return () => clearTimeout(timeout);
    }, [action]);
    const onChangeActions = (page:string)=>{
      redirect(`/perfil/${page}`)
      
    }
  return (
    <Container>
        <ProfileStyle>
          <div className="boxes">
            <div className="box" onClick={() => redirect('/perfil/ordens')}>
              <img src={orderhistory} alt="Ícone de histórico de compras" />
              <p>Histórico de Compras</p>
            </div>

            <div className="box" onClick={() => onChangeActions('cupons')}>
              <img src={couponImg} alt="Ícone de histórico de compras" />
              <p>Meus cupons</p>
            </div>

            <div className="box" onClick={() => onChangeActions('carrinho')}>
              <img src={cartImg} alt="Ícone de histórico de compras" />
              <p>Meu carrinho</p>
            </div>
            <div className="box" onClick={() => onChangeActions('loja')}>
              <img src={storeImg} alt="Ícone de histórico de compras" />
              <p>Minha loja</p>
            </div>
            
          </div>
  
        </ProfileStyle>
      {action === "ordens" && <Orders />}
      {action ==="carrinho" && <Cart formRef={goToForm}/>}
      {action === "cupons" && <UserCoupons formRef={goToForm} />}
      {action === "loja"  && <UserStore formRef={goToForm}/>}
    </Container>
  );
};
 


const Orders = () => <p>Histórico de compras aparecerá aqui.</p>;







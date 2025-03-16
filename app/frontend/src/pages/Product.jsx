import React, { useContext, useState ,useEffect} from "react"
import { Aside, Aside2, Container,Main ,Header} from "../style";
import { TopBar } from "../Components/Header/TopBar";
import {   CartWindowCtx,SetttingsWindowCtx} from "../Contexts";
import { BoxMessage } from "../Components/BoxMessage";
import {  serviceGetProduct } from "../services";

import { CartWindow } from "../Components/Aside/CartWindow";
import { SettingsWindow } from "../Components/Aside/SettingsWindow";
import { useParams } from "react-router-dom";
import { MainContainer } from "../style/product";
import { ProductContainer } from "../Components/Product/ProductContainer";
import { fetchData } from "../Hooks/index";
import { Comments } from "../Components/Product/Comments";


import { RecommendedProducts } from "../Components/Product/RecommendedProducts";
import * as values from "../tests/fixtures";
const newItesm = [values.items[0],values.items[1],values.items[2]]
const datas = {name:'camisa azul',price:55,description:` t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
        ratings:5
    }

export default function Product(){
    const {isWindowCart,setIsWindowCart} = useContext(CartWindowCtx);
    const {isWindowProfile,setIsWindowProfile} = useContext(SetttingsWindowCtx);
    
   
    const {id} = useParams()
    const [items,setItems] = useState({datas:'',status:''});
    
    const service =async()=>{
        return {datas    ,status:200};
    };
    const service2 =async()=>{
        return {datas:newItesm,status:200};
    };
    useEffect(()=>{
     fetchData({service:serviceGetProduct,setItems,body:id})
 
    },[id])

    return (
        <Container>
                <Header>
                    <TopBar isWindowCart={isWindowCart} setIsWindowCart={setIsWindowCart} isWindowProfile={isWindowProfile} setIsWindowProfile={setIsWindowProfile}/>
               
                </Header>
               <Aside>
                 
                </Aside>
          
                <Main>
                    <ProductContainer datas={items.datas}/>
                    <RecommendedProducts service={service2} text={"Produtos recomendados"}/>
                    <Comments/>
                    <RecommendedProducts service={service2} text={"Produtos mais vistos"}/>
                </Main>

                <Aside2>
                    <BoxMessage/>
                    <CartWindow setIsWindowOpen={setIsWindowCart} isWindowOpen={isWindowCart}/>
                    <SettingsWindow setIsSettingsOpen={setIsWindowProfile} isSettingsOpen={isWindowProfile}/>
                </Aside2>
         
        </Container>
    )
};
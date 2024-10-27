import React, { useContext, useState ,useEffect} from "react"
import { Aside, Aside2, Container,Main ,Header} from "../style";
import { TopBar } from "../Components/Header/TopBar";
import {   CartWindowCtx,SetttingsWindowCtx} from "../Contexts";
import { BoxMessage } from "../Components/BoxMessage";
import {  serviceGetProduct } from "../services";
import *as values from '../tests/fixtures';
import { CartWindow } from "../Components/Aside/CartWindow";
import { SettingsWindow } from "../Components/Aside/SettingsWindow";
import { useParams } from "react-router-dom";
import { MainContainer } from "../style/product";
import { ProductContainer } from "../Components/Product/ProductContainer";
import { fetchData } from "../Hooks/index";
import { Comments } from "../Components/Product/Comments";

const datas = {name:'camisa azul',price:55,description:'qoweqbwehbqwjehbqwe  kquwekqbwehqw qbwekqbeb',
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
    useEffect(()=>{
     fetchData({service,setItems})
    },[])

    return (
        <Container>
                <Header>
                    <TopBar isWindowCart={isWindowCart} setIsWindowCart={setIsWindowCart} isWindowProfile={isWindowProfile} setIsWindowProfile={setIsWindowProfile}/>
               
                </Header>
               <Aside>
                 
                </Aside>
          
                <Main>
                   <ProductContainer datas={items.datas}/>
                   <Comments/>
                </Main>

                <Aside2>
                    <BoxMessage/>
                    <CartWindow setIsWindowOpen={setIsWindowCart} isWindowOpen={isWindowCart}/>
                    <SettingsWindow setIsSettingsOpen={setIsWindowProfile} isSettingsOpen={isWindowProfile}/>
                </Aside2>
         
        </Container>
    )
};
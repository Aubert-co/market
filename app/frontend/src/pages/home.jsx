import React, { useState ,useContext, useEffect} from "react"
import { Aside, Aside2, Container,Main ,ProductSection,Header,PromoContainer} from "../style";
import { TopBar } from "../Components/Header/TopBar";
import {  CartWindowCtx, SearchContext, SetttingsWindowCtx } from "../Contexts";
import { BoxMessage } from "../Components/BoxMessage";
import { BoxItems } from "../Components/BoxItems";
import { FilterBar } from "../Components/Aside/FilterBar";
import {  serviceGetItems } from "../services";
import {items} from '../tests/fixtures';
import { CartWindow } from "../Components/Aside/CartWindow";
import { SettingsWindow } from "../Components/Aside/SettingsWindow";
import { BoxPromotion } from "../Components/BoxPromotion";
import { Pagination } from "../Components/Pagination";
import { useNavigate, useLocation } from "react-router-dom";


export default function Home(){
    const {isWindowCart,setIsWindowCart} = useContext(CartWindowCtx);
    const {isWindowProfile,setIsWindowProfile} = useContext(SetttingsWindowCtx);
    const {searchParams,setSearchParams}=   useContext(SearchContext);
    const location = useLocation()
    const queriParams = new URLSearchParams(location.search)
    const pages = queriParams.get("value")
   
    const [currentPage, setCurrentPage] = useState(1 || pages);
    const navigate = useNavigate()
  
   
    const service =async()=>{
        return {datas:items,status:200};
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
        navigate(`/index/pages?value=${page}`)
    };
    return (
        <Container>
           
                <Header>
                    <TopBar isWindowCart={isWindowCart} setIsWindowCart={setIsWindowCart} isWindowProfile={isWindowProfile} setIsWindowProfile={setIsWindowProfile}/>
               
                </Header>
               <Aside>
                 
                </Aside>
          
                <Main>
                    <PromoContainer>
                        <BoxPromotion/>
                    </PromoContainer>
   
                    <ProductSection>
                        <BoxItems currentPage={currentPage} searchParams={searchParams} service={service}/>
                    </ProductSection>
                    <Pagination currentPage={currentPage} totalPages={10} onPageChange={handlePageChange}/>
                </Main>

                <Aside2>
                    <BoxMessage/>
                    <CartWindow setIsWindowOpen={setIsWindowCart} isWindowOpen={isWindowCart}/>
                    <SettingsWindow setIsSettingsOpen={setIsWindowProfile} isSettingsOpen={isWindowProfile}/>
                </Aside2>
      
        </Container>
    )
};
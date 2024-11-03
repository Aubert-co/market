import React, { act } from "react";
import {  render,screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { RecommendedProducts } from "../../Components/Product/RecommendedProducts";
import { Router} from 'react-router-dom'
import { createMemoryHistory } from "history";
import { items } from "../fixtures";


describe("RecommendedProdutcts",()=>{
    it("Should render the items correcly",async ()=>{
        const history = createMemoryHistory();
        const serviceGet = jest.fn().mockReturnValue({status:201,datas:items})
       render(  
             <Router location={history.location} navigator={history}>
                <RecommendedProducts service={serviceGet} text={"Os Produtos mais vistos"}/>
            </Router>
        ) 
        
       await waitFor(()=>{
        expect(screen.queryByTestId("styled_h3").textContent).toEqual("Os Produtos mais vistos")
  
        expect(serviceGet).toHaveBeenCalledTimes(1)
        expect( screen.queryByTestId("product-container")).toBeInTheDocument()
       })
    })
    it("When the service no return empty datas should not render the items",async ()=>{
        const history = createMemoryHistory();
        const serviceGet = jest.fn().mockReturnValue({status:201,datas:[]})
       render(  
             <Router location={history.location} navigator={history}>
                <RecommendedProducts service={serviceGet} text={"Os Produtos mais vistos"}/>
            </Router>
        ) 
        
       await waitFor(()=>{
        expect(screen.queryByTestId("styled_h3").textContent).toEqual("Os Produtos mais vistos")
  
        expect(serviceGet).toHaveBeenCalledTimes(1)
        expect( screen.queryByTestId("item")).not.toBeInTheDocument()
        expect( screen.queryByTestId("product-container")).toBeInTheDocument()
       })
    })
   
})
import React from "react";
import {  render,screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { RecommendedProducts } from "../../Components/Product/RecommendedProducts";
import { Router} from 'react-router-dom'
import { createMemoryHistory } from "history";


describe("RecommendedProdutcts",()=>{
    it("Should render the items correcly",()=>{
        const history = createMemoryHistory();
         render(  
             <Router location={history.location} navigator={history}>
                <RecommendedProducts text={"Os Produtos mais vistos"}/>
            </Router>
        )
        expect(screen.queryByTestId("styled_h3")).toEqual("Os Produtos mais vistos")
    })
})
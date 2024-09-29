import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CleanALlCart } from "../../Components/Aside/ListCartItems";
import { items } from "../fixtures";
import '@testing-library/jest-dom';

import { getCart, saveCart } from "../../Cache";


const createDiv = (id) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add(`Cart_${id}`);
    newDiv.textContent = 'Este é um novo elemento de teste';
    newDiv.style.display = 'block';
    document.body.appendChild(newDiv);
}

describe("CleanAllCart", () => {
    let setTottaly; 
    beforeEach(() => {
        setTottaly = jest.fn();
        localStorage.clear()
    });

    it("When clicking on CleanAllCart, it should update the status of all items in localStorage to deleted true.", () => {
        const datas = items;
        saveCart(datas)
        datas.forEach((val) => {
            createDiv(val.id);
        });

        render(
            <CleanALlCart setTottaly={setTottaly} datas={datas} />
        );

        const cleanAll_cart = screen.queryByTestId("cleanAll_cart");

        fireEvent.click(cleanAll_cart);
        expect( setTottaly ).toHaveBeenCalledTimes(1)
        expect( setTottaly ).toHaveBeenCalledWith( [] )
        datas.forEach((val) => {
            const div = document.querySelector(`.Cart_${val.id}`);
            expect(div).toHaveStyle("display: none"); 
        });
        const getDatas =getCart()

        getDatas.map((val,ind)=>{
            expect(val.deleted).toEqual(true)
            expect(val.id).toEqual(datas[ind].id)
            expect(val.imgPath).toEqual(datas[ind].imgPath)
            expect(val.price).toEqual(datas[ind].price)
            expect(val.quantity).toEqual(datas[ind].quantity)
        })
    });
    it("When there's only one item in localStorage, it should update the status to deleted true.",()=>{
        const datas = [items[0]];
        saveCart(datas)
        datas.forEach((val) => {
            createDiv(val.id);
        });

        render(
            <CleanALlCart setTottaly={setTottaly} datas={datas} />
        );

        const cleanAll_cart = screen.queryByTestId("cleanAll_cart");

        fireEvent.click(cleanAll_cart);
        expect( setTottaly ).toHaveBeenCalledTimes(1)
        expect( setTottaly ).toHaveBeenCalledWith( [] )
        datas.forEach((val) => {
            const div = document.querySelector(`.Cart_${val.id}`);
            expect(div).toHaveStyle("display: none"); 
        });
        const getDatas =getCart()
        
        getDatas.map((val,ind)=>{
            expect(val.deleted).toEqual(true)
            expect(val.id).toEqual(datas[ind].id)
            expect(val.imgPath).toEqual(datas[ind].imgPath)
            expect(val.price).toEqual(datas[ind].price)
            expect(val.quantity).toEqual(datas[ind].quantity)
        })
    })
});

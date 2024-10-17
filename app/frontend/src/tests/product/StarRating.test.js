import React from "react";
import {  render,screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { StarRating } from "../../Components/Product/StarRating";



describe("StarRating",()=>{
    it("When the average rating is equal to 5, the component should render only full stars.",()=>{
        const reviews = [
            {ratings:5},{ratings:5},{ratings:5}
        ]
        render(
            <StarRating reviews={reviews}/>
        )
        const fullStar = screen.queryAllByTestId("full_star")
        const halfStart = screen.queryAllByTestId("half_star")
        const emptyStar = screen.queryAllByTestId("empty_star")

        expect( emptyStar ).toEqual([])
        expect( halfStart ).toEqual( [] )
        expect( fullStar ).toHaveLength( 5 )
    })
    it("Renders only full star components when the average rating is 5, with no empty stars and one half star",()=>{
        const reviews = [
            {ratings:5},{ratings:5},{ratings:4.5}
        ]
        render(
            <StarRating reviews={reviews}/>
        )
        const fullStar = screen.queryAllByTestId("full_star")
        const halfStart = screen.queryAllByTestId("half_star")
        const emptyStar = screen.queryAllByTestId("empty_star")

        expect( emptyStar ).toEqual([])
        expect( halfStart ).toHaveLength( 1 )
        expect( fullStar ).toHaveLength( 4 )
    })
    it("Renders mostly empty stars and one half star when the average rating is low",()=>{
        const reviews = [
            {ratings:1},{ratings:0},{ratings:0}
        ]
        render(
            <StarRating reviews={reviews}/>
        )
        const fullStar = screen.queryAllByTestId("full_star")
        const halfStart = screen.queryAllByTestId("half_star")
        const emptyStar = screen.queryAllByTestId("empty_star")

        expect( emptyStar ).toHaveLength( 4 )
        expect( halfStart ).toHaveLength( 1 )
        expect( fullStar ).toHaveLength( 0 )
    })
    it("Renders one full star, one half star, and three empty stars when the average rating is around 1.67",()=>{
        const reviews = [
            {ratings:5},{ratings:0},{ratings:0}
        ]
        render(
            <StarRating reviews={reviews}/>
        )
        const fullStar = screen.queryAllByTestId("full_star")
        const halfStart = screen.queryAllByTestId("half_star")
        const emptyStar = screen.queryAllByTestId("empty_star")

        expect( emptyStar ).toHaveLength( 3 )
        expect( halfStart ).toHaveLength( 1 )
        expect( fullStar ).toHaveLength( 1 )
    })
    it("Renders only empty stars when the average rating is 0",()=>{
        const reviews = [
            {ratings:0},{ratings:0},{ratings:0}
        ]
        render(
            <StarRating reviews={reviews}/>
        )
        const fullStar = screen.queryAllByTestId("full_star")
        const halfStart = screen.queryAllByTestId("half_star")
        const emptyStar = screen.queryAllByTestId("empty_star")

        expect( emptyStar ).toHaveLength( 5 )
        expect( halfStart ).toHaveLength( 0 )
        expect( fullStar ).toHaveLength( 0 )
    })
})
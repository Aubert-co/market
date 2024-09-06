import React,{useContext, useState} from "react";
import { render,fireEvent, screen, waitFor } from "@testing-library/react";
import { MessageContext } from "../Contexts";
import { BoxMessage } from "../Components/BoxMessage";


var DEFAULT_MESSAGE;



describe('SearchBar',()=>{
    beforeEach(()=>{
        jest.useFakeTimers()
    })
    it("test",async()=>{
        const content = "lorem iptsu"
        DEFAULT_MESSAGE = {
            messageParams:{
                content,type:'sucess'
            },
            setMessageParams:jest.fn()
        }
       jest.spyOn(React,'useState').mockReturnValue([DEFAULT_MESSAGE.messageParams,DEFAULT_MESSAGE.setMessageParams])

        render(
            <MessageContext.Provider value={  DEFAULT_MESSAGE }>
                <BoxMessage/>
              
            </MessageContext.Provider>    
        )
            
        await waitFor(()=>{
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(0)
              
        },{timeout:4000 })
      
        await waitFor(()=>{
            const divMessage = screen.getByTestId("message_box")

            expect(divMessage.className).toEqual("message_"+DEFAULT_MESSAGE.messageParams.type)
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledTimes(1)
            expect(DEFAULT_MESSAGE.setMessageParams).toHaveBeenCalledWith({type:'',content:''})
           
        },{timeout:6000 })
    })
})

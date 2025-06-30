import '@testing-library/jest-dom';
import {fireEvent, render,screen} from '@testing-library/react'
import { PasswordInput } from '../Components/PasswordInput'
import React from 'react'

describe("PasswordInput",()=>{
    const mockRefPassword: React.RefObject<HTMLInputElement | null> = {
  current: {
    value: 'senha123',
    focus: jest.fn(),
  } as unknown as HTMLInputElement,
};

    it("Should hide the input caracters",()=>{
      render(<PasswordInput placeholder={"Digite sua senha"} refPassword={mockRefPassword}/>)
      const input = screen.getByPlaceholderText("Digite sua senha")
      fireEvent.change(input, { target: { value: 'senha1234' } });
    
      
      expect( input).toHaveValue('senha1234')
        
    
    })
})
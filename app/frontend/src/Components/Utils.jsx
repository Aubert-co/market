import React from "react"


export const InputText =React.forwardRef(({ placeholder, className, ...rest }, ref) => (
    <input
      type="text"
      placeholder={placeholder}
      className={className}
      ref={ref}
      required
      minLength={3}
      {...rest}
    />
  ));

export const getInputValue = (ref) =>{
  if(ref?.current && ref.current.value)return ref.current.value
  return ''
}
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
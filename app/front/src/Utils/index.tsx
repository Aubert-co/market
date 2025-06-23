export type RefValue = React.RefObject<HTMLInputElement | null>;

export const getInputValue = (ref:RefValue):string =>{
    if(ref?.current && ref.current.value)return ref.current.value;
    return '';
};
export const getMultiInputValues = (...refs:RefValue[]):string[]=>refs.map((val)=>getInputValue(val));

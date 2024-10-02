import React,{useEffect} from "react";


export const fetchData = async ({body,setItems,service}) => {
   
    const {datas,status} = await service({ body })
    setItems({datas,status})
    return null
};


const useLockBodyScroll = (isWindowOpen) => {
  useEffect(() => {

    document.body.style.overflow = isWindowOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isWindowOpen]);
};

export default useLockBodyScroll;
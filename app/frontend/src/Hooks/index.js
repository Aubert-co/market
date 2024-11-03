import React,{useEffect} from "react";


export const fetchData = async ({ body, setItems, service }) => {
  try {
    const params = body ? { body } : undefined; 
    const { datas, status } = await service(params);
    
    setItems({ datas, status });
  } catch (error) {
    setItems({ datas: [], status: 500 });
  }
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
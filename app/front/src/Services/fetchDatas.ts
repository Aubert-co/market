type FetchDataParams<TArg,TResults>= {
    setItems:(data:{datas:TResults,status:number,currentPage?:number,totalPages?:number})=>void;
    service:(args:TArg)=>Promise<{datas:TResults,status:number,currentPage?:number,totalPages?:number}>;
    args:TArg,
}

export const fetchData = async <TArg,TResults>({setItems,service,args}:FetchDataParams<TArg,TResults>) => {
  try {

    const response = await service(args)
  
    setItems({ datas:response.datas, status:response.status,
      currentPage:response?.currentPage ,totalPages:response?.totalPages});
  } catch (error) {
    setItems({ datas: [] as TResults, status: 500 });
  }
};

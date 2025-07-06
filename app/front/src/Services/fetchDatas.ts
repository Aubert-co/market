type FetchDataParams<TArg,TResults>= {
    setItems:(data:{datas:TResults,status:number})=>void;
    service:(args:TArg)=>Promise<{datas:TResults,status:number,currentPage:number,totalPages:number}>;
    args:TArg;
    setPages:(data:{currentPage:number,totalPages:number})=>void 
}

export const fetchData = async <TArg,TResults>({setItems,service,args,setPages}:FetchDataParams<TArg,TResults>) => {
  try {

    const response = await service(args)
  
    setItems({ datas:response.datas, status:response.status});
    setPages({currentPage:response.currentPage,totalPages:response.totalPages})
  } catch (error) {
    setItems({ datas: [] as TResults, status: 500});
    setPages({currentPage:1,totalPages:1})
  }
};

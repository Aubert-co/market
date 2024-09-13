export let setMessageParams = jest.fn()
export let mockContextValue = (content,type)=>{
    return {
        messageParams: { content, type },   
        setMessageParams
    };
}
export let setIsWindowOpen= jest.fn()

export let mockIsWindowOpen =(window)=>{
    return{
        isWindowOpen:window,
        setIsWindowOpen
    }
}
export let isCartWindow = jest.fn();

export let mockCartWindow = (window)=>{
    return{
        isWindowOpen:window,
        setIsWindowOpen:isCartWindow
    }
}

export let mockSearchCtx = jest.fn()

export let mockSearch = ({name,lowPrice,highPrice})=>{
    return {
        searchParams:{name,lowPrice,highPrice},
        setSearchParams:mockSearchCtx
    }
}
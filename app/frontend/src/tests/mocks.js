export let setMessageParams = jest.fn()
export let mockContextValue = (content,type)=>{
    return {
        messageParams: { content, type },   
        setMessageParams
    };
}
import { useMessage } from "../Context/MessageContext";


export const BoxMessage = ()=>{
   const {message}= useMessage()
    return (
        <>
            {message?.content && (
                <div className={"message_"+message.type} data-testid="message_box">
                    <p data-testid="message_content">{message.content}</p>
                </div>
            )}
        </>
    );
    
};
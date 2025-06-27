import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import { Register } from "./Register"
import { MessageProvider } from "../Context/MessageContext"
import { Login } from "./Login"


export const App = ()=>{
    return(
    <MessageProvider>
    <Router>
        <Routes>
            <Route>
                <Route path="/registro" element={<Register/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Route>
        </Routes>
    </Router>
    </MessageProvider>
    )
}
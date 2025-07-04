import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import { Register } from "./Register"
import { MessageProvider } from "../Context/MessageContext"
import { Login } from "./Login"
import {Home} from './Home'

export const App = ()=>{
    return(
    <MessageProvider>
    <Router>
        <Routes>
            <Route>
                <Route path="/" element={<Home/>}/>
                <Route path="/registro" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Route>
        </Routes>
    </Router>
    </MessageProvider>
    )
}
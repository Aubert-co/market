import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import { Register } from "./Register"
import { MessageProvider } from "../Context/MessageContext"


export const App = ()=>{
    <MessageProvider>
    <Router>
        <Routes>
            <Route>
                <Route path="/registro" element={<Register/>}></Route>
            </Route>
        </Routes>
    </Router>
    </MessageProvider>
}
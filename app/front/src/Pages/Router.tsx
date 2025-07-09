import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import { Register } from "./Register"
import { MessageProvider } from "../Context/MessageContext"
import { Login } from "./Login"
import {Home} from './Home'
import { MyStores } from "./MyStores"
import {UserStore} from './UserStore'

export const App = ()=>{
    return(
    <MessageProvider>
    <Router>
        <Routes>
            <Route>
                <Route path="/" element={<Home/>}/>
                <Route path="/registro" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/my-stores" element={<MyStores />} />
                <Route path="/my-stores/:storeId" element={<UserStore />} />
            </Route>
        </Routes>
    </Router>
    </MessageProvider>
    )
}
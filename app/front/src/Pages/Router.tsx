import { BrowserRouter as Router ,Routes,Route, Outlet} from "react-router-dom"
import { Register } from "./Register"
import { MessageProvider } from "../Context/MessageContext"
import { Login } from "./Login"
import {Home} from './Home'
import { AdminStore } from "./AdminStore"

import { AdminProducts } from "./AdminProducts"
import { AuthGuard } from "../Components/AuthGuard"

export const App = ()=>{
    return(
    <MessageProvider>
    <Router>
        <Routes>
            <Route>
                <Route path="/" element={<Home/>}/>
                <Route path="/registro" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route element={<AuthGuard><Outlet /></AuthGuard>}>
                    <Route path="/admin/products/:storeid" element={<AdminProducts />} />
                    <Route path="/admin/stores" element={<AdminStore />} />
                </Route>

            </Route>
        </Routes>
    </Router>
    </MessageProvider>
    )
}
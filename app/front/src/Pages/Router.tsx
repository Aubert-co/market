import { BrowserRouter as Router ,Routes,Route, Outlet} from "react-router-dom"
import { Register } from "./Register"
import { MessageProvider } from "../Context/MessageContext"
import { Login } from "./Login"
import {Home} from './Home'
import { CreateStore } from "./CreateStore"

import {  StoreAdmin } from "./StoreAdmin"
import { AuthGuard } from "../Components/AuthGuard"
import { Products } from "./Product"
import {Profile} from './Profile'


export const App = ()=>{
    return(
    <MessageProvider>
    <Router>
        <Routes>
            <Route>
                <Route path="/" element={<Home/>}/>
                <Route path="/registro" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/perfil/:action" element={<Profile/>}></Route>
                <Route path="/product/:productId" element={<Products/>} />
                <Route element={<AuthGuard><Outlet /></AuthGuard>}>
                    <Route path="/loja/gerenciar/:storeid" element={<StoreAdmin />} />
                    <Route path="/loja/criar" element={<CreateStore />} />
                </Route>

            </Route>
        </Routes>
    </Router>
    </MessageProvider>
    )
}
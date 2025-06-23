import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"


export const App = ()=>{
    <Router>
        <Routes>
            <Route>
                <Route path="/register" element={<Register/>}></Route>
            </Route>
        </Routes>
    </Router>
}
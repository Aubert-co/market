import { Link } from "react-router-dom"
import { SearchBar } from "./SeachBar"
import { FaShoppingCart, FaUser } from "react-icons/fa"

export const TopBar = ()=>{
    return(
        <>
            <div className="logo">
                <Link to={"/"}>SUPERSTORE</Link>
            </div>
            <SearchBar/>
            <nav>
                <i>
                    <FaShoppingCart/>
                </i>

                <i>
                    <FaUser/>
                </i>
            </nav>
        </>
    )
}
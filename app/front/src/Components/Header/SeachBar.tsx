export const SearchBar = ()=>{
    return (

        <div className="search">
            <input name="input_search" required minLength={2} maxLength={20} className="input_search"  placeholder="BUSQUE POR UM PRODUTO"/>
            <button className="btn_search"  >BUSCAR</button>
        </div>
    )
}
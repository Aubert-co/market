export const SearchBar = ()=>{
    return (

        <div className="search">
            <input required minLength={2} maxLength={20} className="input_search" data-testid="input_test" placeholder="BUSQUE POR UM PRODUTO"/>
            <button className="btn_search" data-testid="btn_search" >BUSCAR</button>
        </div>
    )
}
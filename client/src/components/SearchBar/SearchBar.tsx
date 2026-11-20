export const SearchBar = () => {
    return (
        <form className="search-bar">
            <input className="search-bar__input" 
            type="text" placeholder="Buscar habilidad" 
            required />
            <button className="search-bar__button" type="submit">Buscar</button>
        </form>
    )
}
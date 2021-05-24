import "./SearchBar.css";

const SearchBar = () => {
    return (
        <form className="search__bar">
            <i className="fa fa-search"></i>
            <input type="search" className="search__input" placeholder="Search"/>
        </form>
    );
};

export default SearchBar;

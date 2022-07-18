import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import SearchBar from './SearchBar';
import searchIcon from '../../images/searchIcon.svg';

function SearchTopBtn() {
  const { showSearchBox, setShowSearchBox } = useContext(RecipesContext);

  return (
    <>
      <button
        type="button"
        name="hide-unhide-btn"
        data-testid="search-top-btn"
        onClick={ () => setShowSearchBox(!showSearchBox) }
        src={ searchIcon }
      >
        <img src={ searchIcon } alt="Search Icon" />
      </button>
      <div>
        { showSearchBox && <SearchBar />}
      </div>
    </>
  );
}

export default SearchTopBtn;

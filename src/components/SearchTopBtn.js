import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import SearchBar from './SearchBar';

function SearchTopBtn() {
  const { showSearchBox, setShowSearchBox } = useContext(RecipesContext);

  return (
    <>
      <button
        type="button"
        name="hide-unhide-btn"
        data-testid="search-top-btn"
        onClick={ () => setShowSearchBox(!showSearchBox) }
      >
        O
      </button>
      <div>
        { showSearchBox && <SearchBar />}
      </div>
    </>
  );
}

export default SearchTopBtn;

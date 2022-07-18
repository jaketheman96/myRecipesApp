import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import SearchBar from './SearchBar';
import searchIcon from '../../images/searchIcon.svg';

function SearchTopBtn() {
  const { showSearchBox, setShowSearchBox } = useContext(RecipesContext);

  return (
    <>
      <input
        type="image"
        name="hide-unhide-btn"
        data-testid="search-top-btn"
        onClick={ () => setShowSearchBox(!showSearchBox) }
        src={ searchIcon }
        alt="Search Icon"
      />
      <div>
        { showSearchBox && <SearchBar />}
      </div>
    </>
  );
}

export default SearchTopBtn;

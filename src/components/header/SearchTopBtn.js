import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import SearchBar from './SearchBar';
import searchIcon from '../../images/searchIcon.svg';
import styles from './styles/SearchTopBtn.module.css';

function SearchTopBtn() {
  const { showSearchBox, setShowSearchBox } = useContext(RecipesContext);

  return (
    <section className={ styles.lupaClick }>
      <input
        type="image"
        name="hide-unhide-btn"
        data-testid="search-top-btn"
        onClick={ () => setShowSearchBox(!showSearchBox) }
        src={ searchIcon }
        alt="Search Icon"
        className={ styles.lupa1 }
      />
      <div className={ styles.search }>
        { showSearchBox && <SearchBar />}
      </div>
    </section>
  );
}

export default SearchTopBtn;

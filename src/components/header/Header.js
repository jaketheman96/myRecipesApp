import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import PageTitle from './PageTitle';
import ProfileTopBtn from './ProfileTopBtn';
import styles from './styles/Header.module.css';
import SearchBar from './SearchBar';
import searchIcon from '../../images/searchIcon.svg';

function Header() {
  const { pathNames, showSearchBox, setShowSearchBox } = useContext(RecipesContext);

  return (
    <div>
      <header className={ styles.header }>
        <ProfileTopBtn />
        <PageTitle />
        <div className={ styles.lupa }>
          {pathNames === 'Profile'
          || pathNames === 'Done Recipes'
          || pathNames === 'Favorite Recipes'
            ? null : (
              <input
                type="image"
                name="hide-unhide-btn"
                data-testid="search-top-btn"
                onClick={ () => setShowSearchBox(!showSearchBox) }
                src={ searchIcon }
                alt="Search Icon"
                className={ styles.lupa1 }
              />
            )}
        </div>
      </header>
      <div className={ styles.lupaDisplay }>
        { showSearchBox && <SearchBar />}
      </div>
    </div>
  );
}

export default Header;

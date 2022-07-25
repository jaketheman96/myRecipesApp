import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import PageTitle from './PageTitle';
import ProfileTopBtn from './ProfileTopBtn';
import SearchTopBtn from './SearchTopBtn';
import styles from './styles/Header.module.css';

function Header() {
  const { pathNames } = useContext(RecipesContext);

  return (
    <header className={ styles.header }>
      <ProfileTopBtn />
      <PageTitle />
      <div className={ styles.lupa }>
        {pathNames === 'Profile'
        || pathNames === 'Done Recipes'
        || pathNames === 'Favorite Recipes'
          ? null : <SearchTopBtn />}
      </div>
    </header>
  );
}

export default Header;

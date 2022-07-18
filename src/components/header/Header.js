import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import PageTitle from './PageTitle';
import ProfileTopBtn from './ProfileTopBtn';
import SearchTopBtn from './SearchTopBtn';

function Header() {
  const { pathNames } = useContext(RecipesContext);

  return (
    <header>
      <ProfileTopBtn />
      <PageTitle />
      {pathNames === 'Profile'
       || pathNames === 'Done Recipes'
       || pathNames === 'Favorite Recipes'
        ? null : <SearchTopBtn />}
    </header>
  );
}

export default Header;

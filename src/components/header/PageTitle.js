import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';

function PageTitle() {
  const { pathNames } = useContext(RecipesContext);

  return (
    <div data-testid="page-title">{pathNames}</div>
  );
}

export default PageTitle;

import React, { useContext, useEffect } from 'react';
import RecipesContext from '../../context/RecipesContext';

function PageTitle() {
  const { pathNames, handleLetters } = useContext(RecipesContext);

  useEffect(() => {
    handleLetters();
  }, []);

  return (
    <div data-testid="page-title">{pathNames}</div>
  );
}

export default PageTitle;

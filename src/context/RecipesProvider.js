import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');

  const globalState = {
    userEmail,
    setUserEmail,
  };

  return (
    <RecipesContext.Provider value={ globalState }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;

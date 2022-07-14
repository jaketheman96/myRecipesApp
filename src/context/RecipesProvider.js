import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [teste, setTeste] = useState('');

  return (
    <RecipesContext.Provider value={ { teste, setTeste } }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;

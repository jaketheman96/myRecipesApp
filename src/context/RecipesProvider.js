import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [searchType, setSearchType] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [pathNames, setPathNames] = useState('');
  const { pathname } = useLocation();

  const handleLetters = () => {
    const removeFirstLetter = pathname.slice(1);
    const removingTrace = removeFirstLetter.replaceAll('-', ' ');
    const arrPathNames = removingTrace.split(' ');
    for (let i = 0; i < arrPathNames.length; i += 1) {
      arrPathNames[i] = arrPathNames[i]
        .charAt(0)
        .toUpperCase() + arrPathNames[i].slice(1);
    }
    setPathNames(arrPathNames.join(' '));
  };

  const STATE = {
    userEmail,
    setUserEmail,
    password,
    setPassword,
    disabled,
    setDisabled,
    loading,
    setLoading,
    searchType,
    setSearchType,
    searchedData,
    setSearchedData,
    showSearchBox,
    setShowSearchBox,
    pathNames,
    setPathNames,
    handleLetters,
  };

  return (
    <RecipesContext.Provider value={ STATE }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;

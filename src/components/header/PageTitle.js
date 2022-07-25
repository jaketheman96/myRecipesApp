import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import styles from './styles/PageTitle.module.css';

function PageTitle() {
  const { pathNames } = useContext(RecipesContext);

  return (
    <div data-testid="page-title" className={ styles.pageTitle }>{pathNames}</div>
  );
}

export default PageTitle;

import React from 'react';
/* import { Link } from 'react-router-dom'; */
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <input
        type="image"
        src={ drinkIcon }
        alt="Drinks"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        className={ styles.footerImg1 }
      />
      <input
        type="image"
        src={ mealIcon }
        alt="Food"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
        className={ styles.footerImg2 }
      />
    </footer>
  );
}

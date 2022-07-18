import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Login.module.css';
import RecipesContext from '../context/RecipesContext';
import Logo from '../images/logo.png';

function Login({ history }) {
  const {
    userEmail,
    setUserEmail,
    disabled,
    setDisabled,
    password,
    setPassword,
  } = useContext(RecipesContext);

  useEffect(() => {
    const validation = () => {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const numLength = 6;
      if (password.length > numLength && userEmail.match(emailRegex)) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    validation();
  });

  const handleClick = () => {
    const email = { email: userEmail };
    localStorage.setItem('user', JSON.stringify(email));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <main className={ styles.main }>
      <form onSubmit={ handleClick } className={ styles.form }>
        <img src={ Logo } alt="logo" className={ styles.img } />
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="E-mail"
          value={ userEmail }
          onChange={ (e) => setUserEmail(e.target.value) }
          className={ styles.input }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Password"
          className={ styles.input }
        />
        {/* <label htmlFor="checkbox" className={ styles.checkboxLabel }>
          <input name="checkbox" type="checkbox" className={ styles.checkbox } />
          <p className={ styles.checkboxText }>remember me</p>
        </label> */}
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ disabled }
          className={ styles.button }
        >
          Login
        </button>
      </form>
    </main>
  );
}
Login.propTypes = {
  history: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default Login;

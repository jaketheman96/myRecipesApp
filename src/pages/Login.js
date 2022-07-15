import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../style/Login.css';
import RecipesContext from '../context/RecipesContext';
import SearchBar from '../components/SearchBar';

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
    <div className="login-inputs">
      <form onSubmit={ handleClick }>
        <label htmlFor="email">
          {' '}
          E-mail:
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Digite seu E-mail"
            value={ userEmail }
            onChange={ (e) => setUserEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          {' '}
          Password:
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ disabled }
          className="submit-btn"
        >
          Login
        </button>
      </form>
      <SearchBar />
    </div>
  );
}
Login.propTypes = {
  history: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default Login;

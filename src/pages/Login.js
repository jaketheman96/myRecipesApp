import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function Login({ history }) {
  const { userEmail, setUserEmail } = useContext(RecipesContext);

  const handleClick = () => {
    const email = { email: userEmail };
    localStorage.setItem('user', JSON.stringify(email));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/recipes');
  };

  return (
    <div>
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
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="submit"
        onClick={ handleClick }
      >
        Login
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default Login;

import React from 'react';

function Login() {
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
      <button data-testid="login-submit-btn" type="submit">Login</button>
    </div>
  );
}

export default Login;

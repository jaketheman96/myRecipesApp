import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da tela de Login', () => {
  beforeEach(() => render(<App />))

  it('1. O formulário existe e aceita apenas e-mail e senha válidos;', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'maing');
    expect(loginBtn).toBeDisabled();

    userEvent.type(passwordInput, 'main');
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'roup17@trybe.com');
    userEvent.type(passwordInput, 'g17');
    expect(loginBtn).toBeEnabled();
  });

  it('2. As informações de email e tokens são devidamente salvas no localStorage;', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'maingroup17@trybe.com');
    userEvent.type(passwordInput, 'maing17');
    userEvent.click(loginBtn);

    const storedEmail = JSON.parse(localStorage.getItem('user')).email;
    expect(storedEmail).toBe('maingroup17@trybe.com');
  })
});

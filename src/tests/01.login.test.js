import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da tela de Login', () => {
  beforeEach
  it('1. O formulário existe e aceita apenas e-mail e senha válidos;', () => {
    render(<App />);
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
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LoginForm } from './login-form';


describe('inspire bank login', () => {
  it('should render', () => {
    const { baseElement } = render(<LoginForm />);
    expect(baseElement).toBeTruthy();
    // expect(screen.getByTestId('inspire-bank-login-wrapper')).toBeInTheDocument();
  })
});


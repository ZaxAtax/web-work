import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Header } from './header';

describe('inspire bank header', () => {
  it('should render', () => {
    const { baseElement } = render(<Header title="a" slogan="b" />);
    expect(baseElement).toBeTruthy();
    expect(
      screen.getByTestId('inspire-bank-header-wrapper')
    ).toBeInTheDocument();
  });
});

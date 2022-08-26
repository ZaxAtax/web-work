import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccountCard } from './account-card';

describe('inspire bank account info', () => {
  it('should render', () => {
    const { baseElement } = render(
      <AccountCard accnumber="a" acctype="b" balance={1} accname="c" />
    );
    expect(baseElement).toBeTruthy();
    expect(
      screen.getByTestId('inspire-bank-account-info-wrapper')
    ).toBeInTheDocument();
  });
});

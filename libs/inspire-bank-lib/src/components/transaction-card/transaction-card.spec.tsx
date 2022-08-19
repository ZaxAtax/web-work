import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TransactionCard } from './transaction-card';

describe('inspire bank account info', () => {
  beforeEach(() => {
    const { baseElement } = render(
      <TransactionCard balance={1} transaction={2} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render', () => {
    expect(
      screen.getByTestId('inspire-bank-transaction-info-wrapper')
    ).toBeInTheDocument();
  });

  it('should have correct balance text', () => {
    const balance = screen.getByTestId('inspire-bank-transaction-balance');
    expect(balance).toBeInTheDocument();
    expect(balance).toHaveTextContent('Balance: $1');
  });

  it('should have correct transation text', () => {
    const amount = screen.getByTestId('inspire-bank-transaction-amount');
    expect(amount).toBeInTheDocument();
    expect(amount).toHaveTextContent('+ $2');
  });
});

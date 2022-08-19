import { Stack } from '@mui/material';
import {
  TransactionCard,
  TransactionCardProps,
} from '@web-work/inspire-bank-lib';

const transactions: (TransactionCardProps & { id: string })[] = [
  {
    id: '1',
    balance: 500,
    transaction: 12,
  },
  {
    id: '2',
    balance: 700,
    transaction: -5,
  },
];

export function Account() {
  return (
    <Stack spacing={2}>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} {...transaction} />
      ))}
    </Stack>
  );
}

export default Account;

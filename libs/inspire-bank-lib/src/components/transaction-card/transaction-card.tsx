import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { useMemo } from 'react';

export interface TransactionCardProps {
  balance: number;
  transaction: number;
}

export function TransactionCard({
  balance,
  transaction
}: TransactionCardProps) {
  const transactionText = useMemo(() => {
    if (transaction < 0) {
      return `- $${Math.abs(transaction)}`
    }
    if (transaction > 0) {
      return `+ $${transaction}`
    }
    return '$0';
  }, [transaction]);

  return (
    <Card
      sx={{ minWidth: 275 }}
      data-testid="inspire-bank-transaction-info-wrapper"
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom data-testid="inspire-bank-transaction-balance">
          Balance: ${balance}
        </Typography>
        <Typography variant="h5" data-testid="inspire-bank-transaction-amount">
          <>
            Transaction: {transactionText}
          </>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Temp
        </Typography>
        <Typography variant="body2">Blank Stuff</Typography>
      </CardContent>
    </Card>
  );
}

export default TransactionCard;

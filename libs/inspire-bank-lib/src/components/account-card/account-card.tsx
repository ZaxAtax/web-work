import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

export interface AccountCardProps {
  accnumber: string;
  acctype: string;
  balance: number;
  accname: string;
}

export function AccountCard({
  accnumber,
  acctype,
  balance,
  accname,
}: AccountCardProps) {
  return (
    <Card
      sx={{ minWidth: 275 }}
      data-testid="inspire-bank-account-info-wrapper"
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Account Name: {accname}
        </Typography>
        <Typography variant="h5" component="div">
          Account Number: {accnumber}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Account Type: {acctype}
        </Typography>
        <Typography variant="body2">
          Balance: ${balance}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default AccountCard;

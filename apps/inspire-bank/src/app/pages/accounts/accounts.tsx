import { Stack } from '@mui/material';
import { AccountCard, AccountCardProps } from '@web-work/inspire-bank-lib';

const accounts: AccountCardProps[] = [
  {
    accnumber: '5634',
    acctype: 'checking',
    balance: 12,
    accname: 'Dennis Checking',
  },
  {
    accnumber: '5635',
    acctype: 'saving',
    balance: 600000,
    accname: "Mrs.Baxter's Saving",
  },
];

export function Accounts() {
  return (
    <Stack spacing={2}>
      {accounts.map((account) => (
        <AccountCard key={account.accnumber} {...account} />
      ))}
    </Stack>
  );
}

export default Accounts;

import { AppBar, Toolbar } from '@mui/material';

export interface HeaderProps {
  title: string;
  slogan: string;
}

export function Header({ title, slogan }: HeaderProps) {
  return <AppBar data-testid="inspire-bank-header-wrapper"><Toolbar>{title} {slogan}</Toolbar></AppBar>;
}

export default Header;

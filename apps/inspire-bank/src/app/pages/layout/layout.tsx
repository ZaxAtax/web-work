import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Header } from '@web-work/inspire-bank-lib';

export function Layout() {
  return (
    <>
      <Header title="Inspire Bank" slogan="We Aim To Inspire" />
      <Container
        sx={{
          flexGrow: '1 1 auto',
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;

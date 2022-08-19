import { useCallback } from 'react';
import { LoginForm } from '@web-work/inspire-bank-lib';

export function Login() {
  const handleSubmit = useCallback(() => {}, []);

  return <LoginForm onSubmit={handleSubmit} />;
}

export default Login;

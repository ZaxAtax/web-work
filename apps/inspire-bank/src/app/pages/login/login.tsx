import { useCallback } from 'react';
import { LoginForm } from '@web-work/inspire-bank-lib';

export function Login() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleSubmit = useCallback(() => {}, []);

  return <LoginForm onSubmit={handleSubmit} />;
}

export default Login;

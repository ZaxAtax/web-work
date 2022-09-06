import { useCallback } from 'react';
import { SignUpForm } from '@web-work/inspire-bank-lib';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (username: string, password: string, confirmationCode?: string) => {
      if (confirmationCode) {
        fetch('http://localhost:3333/auth/signup/confirm', {
          method: 'POST',
          body: JSON.stringify({ username, password, confirmationCode }),
        }).then(() => {
          navigate('/');
        });
      } else {
        fetch('http://localhost:3333/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        }).then(() => {});
      }
    },
    [navigate]
  );

  return <SignUpForm onSubmit={handleSubmit} />;
}

export default SignUp;

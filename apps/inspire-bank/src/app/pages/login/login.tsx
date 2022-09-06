import { useCallback } from 'react';
import { LoginForm } from '@web-work/inspire-bank-lib';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const handleSubmit = useCallback((username: string, password: string) => {
    fetch('http://localhost:3333/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("idToken", data.idToken)
        navigate("/accounts")
      });
  }, [navigate]);

  return <LoginForm onSubmit={handleSubmit} />;
}

export default Login;

import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { Button, TextField } from '@mui/material';

export interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUsername(event.target.value);
    },
    []
  );

  const onPasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      onSubmit(username, password);
    },
    [onSubmit, username, password]
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <TextField
        type="text"
        label="Username"
        variant="outlined"
        onChange={onUsernameChange}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        onChange={onPasswordChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Log In
      </Button>
    </form>
  );
}

export default LoginForm;

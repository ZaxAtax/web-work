import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { Button, TextField } from '@mui/material';

export interface SignUpFormProps {
  onSubmit: (
    username: string,
    password: string,
    confirmationCode?: string
  ) => void;
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showConfirmationCode, setShowConfirmationCode] = useState(false);

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

  const onConfirmationCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setConfirmationCode(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (showConfirmationCode) {
        onSubmit(username, password, confirmationCode);
      } else {
        onSubmit(username, password);
        setShowConfirmationCode(true);
      }
    },
    [onSubmit, username, password, confirmationCode, showConfirmationCode]
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {!showConfirmationCode ? (
        <>
          <TextField
            type="email"
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
        </>
      ) : (
        <TextField
          type="text"
          label="Confirmation Code"
          variant="outlined"
          onChange={onConfirmationCodeChange}
        />
      )}
      <Button type="submit" variant="contained" color="primary">
        Log In
      </Button>
    </form>
  );
}

export default SignUpForm;

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';

// https://github.com/mui/material-ui/blob/v5.8.4/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // https://javascript.plainenglish.io/basic-react-login-using-external-api-e33322e480cd
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const postBody = JSON.stringify({ email, password });
    try {
      setLoading(true);
      const response = await fetch('http://localhost:1337/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: postBody,
      });
      const responseJSON = await response.json();
      if (response.status === 200) {
        const adminJSON = JSON.stringify(responseJSON.admin);
        const token = responseJSON.token.split(' ')[1];
        localStorage.setItem('admin', adminJSON);
        localStorage.setItem('token', token);
        window.location.href = '/';
      } else {
        setError(`Prisijungti nepavyko, bandykite dar kartą. Klaida: ${responseJSON.error}`);
      }
    } catch (err) {
      setError('Prisijungti nepavyko, serverio klaida.');
    }
    setLoading(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Administratorių prisijungimas
        </Typography>
        {!loading
          && (
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="El. paštas"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Slaptažodis"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Prisijungti
            </Button>
          </Box>
          )}
        {loading
          && (
          <Typography component="h1" variant="h5">Jungiamasi...</Typography>
          )}
        {error
          && (
            <Typography component="h1" variant="h5">{error}</Typography>
          )}
      </Box>
    </Container>
  );
};

export default LoginPage;

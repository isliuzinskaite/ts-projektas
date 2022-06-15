import React from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const email = data.get('email');
  const password = data.get('password');
  try {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    // const responseJSON = await response.json();
    if (response.status === 200) {
      // console.log('Prisijungimas pavyko');
    } else {
      // console.log('Prisijungimas nepavyko');
    }
  } catch (error) {
    // console.log('Prisijungimas nepavyko', error);
  }
};

// https://github.com/mui/material-ui/blob/v5.8.4/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
const LoginPage: React.FC = () => (
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
    </Box>
  </Container>
);

export default LoginPage;

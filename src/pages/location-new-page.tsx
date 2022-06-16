import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import getAdmin from '../services/get-admin';

const LocationNewPage: React.FC = () => {
  const [admin] = useState(getAdmin);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { regionId } = useParams() as { regionId: string };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const region = regionId;
    const postBody = JSON.stringify({
      name,
      region,
    });
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const response = await fetch('http://localhost:1337/api/locations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: postBody,
      });
      const responseJSON = await response.json();
      if (response.status === 201) {
        window.location.href = `/regions/${regionId}`;
      } else {
        setError(`Sukurti regiono nepavyko, bandykite dar kartą. Klaida: ${responseJSON.error}`);
      }
    } catch (err) {
      setError('Sukurti regiono nepavyko, serverio klaida.');
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
          Nauja vietovė
        </Typography>
        {!loading
          && (
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Vietovės pavadinimas"
              name="name"
              autoComplete="false"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sukurti
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

export default LocationNewPage;

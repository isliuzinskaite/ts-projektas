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

const PropertyNewPage: React.FC = () => {
  const [admin] = useState(getAdmin);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { locationId } = useParams() as { locationId: string };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const title = data.get('title');
    const address = data.get('address');
    const image = data.get('image');
    const phone = data.get('phone');
    const location = locationId;
    const postBody = JSON.stringify({
      title,
      address,
      image,
      phone,
      location,
    });
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const response = await fetch('http://localhost:1337/api/properties/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: postBody,
      });
      const responseJSON = await response.json();
      if (response.status === 201) {
        window.location.href = `/locations/${locationId}`;
      } else {
        setError(`Sukurti būsto nepavyko, bandykite dar kartą. Klaida: ${responseJSON.error}`);
      }
    } catch (err) {
      setError('Sukurti būsto nepavyko, serverio klaida.');
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
          Naujas būstas
        </Typography>
        {!loading
          && (
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Pavadinimas"
              name="title"
              autoComplete="false"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Adresas"
              name="address"
              autoComplete="false"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nuotrauka"
              name="image"
              autoComplete="false"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Telefonas"
              name="phone"
              autoComplete="false"
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

export default PropertyNewPage;

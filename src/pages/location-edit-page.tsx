import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetLocationQuery } from '../services/region-api';
import { Location } from '../types';
import getAdmin from '../services/get-admin';

const LocationForm = ({ location }: { location: Location }) => {
  const [submitError, setSubmitError] = useState<any | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const postBody = JSON.stringify({ name });
    const token = localStorage.getItem('token');
    try {
      setSubmitLoading(true);
      const response = await fetch(`http://localhost:1337/api/locations/${location.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: postBody,
      });
      const responseJSON = await response.json();
      if (response.status === 200) {
        window.location.href = '/';
      } else {
        setSubmitError(`Atnaujinti vietovės nepavyko, bandykite dar kartą. Klaida: ${responseJSON.error}`);
      }
    } catch (err) {
      setSubmitError('Atnaujinti vietovės nepavyko, serverio klaida.');
    }
    setSubmitLoading(false);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        {`Redaguoti vietovę ${location.name}`}
      </Typography>

      {!submitLoading
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
            defaultValue={location.name}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Pakeisti
          </Button>
        </Box>
        )}
      {submitLoading
        && (
        <Typography component="h1" variant="h5">Jungiamasi...</Typography>
        )}
      {submitError
        && (
          <Typography component="h1" variant="h5">{submitError}</Typography>
        )}
    </Box>
  );
};

const LocationEditPage: React.FC = () => {
  const [admin] = useState(getAdmin);

  const { locationId } = useParams() as { locationId: string };
  const {
    data: locationData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLocationQuery(locationId);

  let content;

  if (isLoading) {
    content = <>Kraunama...</>;
  } else if (isSuccess) {
    content = <LocationForm location={locationData.location} />;
  } else if (isError) {
    content = <>{error.toString()}</>;
  }
  return (
    <Container maxWidth="md" component="main">
      {content}
    </Container>
  );
};

export default LocationEditPage;

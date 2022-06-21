import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetPropertyQuery } from '../services/region-api';
import { Property } from '../types';

const PropertyForm = ({ property }: { property: Property }) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    const data = new FormData(event.currentTarget);
    const title = data.get('title');
    const address = data.get('address');
    const image = data.get('image');
    const phone = data.get('phone');
    const postBody = JSON.stringify({
      title,
      address,
      image,
      phone,
    });
    const token = localStorage.getItem('token');
    try {
      setSubmitLoading(true);
      const response = await fetch(`http://localhost:1337/api/properties/${property.id}`, {
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
        setSubmitError(`Atnaujinti būsto nepavyko, bandykite dar kartą. Klaida: ${responseJSON.error}`);
      }
    } catch (err) {
      setSubmitError('Atnaujinti būsto nepavyko, serverio klaida.');
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
        {`Redaguoti būstą ${property.title}`}
      </Typography>

      {!submitLoading
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
              defaultValue={property.title}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Adresas"
              name="address"
              autoComplete="false"
              defaultValue={property.address}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nuotrauka"
              name="image"
              autoComplete="false"
              defaultValue={property.image}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Telefonas"
              name="phone"
              autoComplete="false"
              defaultValue={property.phone}
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

const PropertyEditPage: React.FC = () => {
  const { propertyId } = useParams() as { propertyId: string };
  const {
    data: propertyData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPropertyQuery(propertyId);

  let content;

  if (isLoading) {
    content = <>Kraunama...</>;
  } else if (isSuccess) {
    content = <PropertyForm property={propertyData.property} />;
  } else if (isError) {
    content = <>{error.toString()}</>;
  }
  return (
    <Container maxWidth="md" component="main">
      {content}
    </Container>
  );
};

export default PropertyEditPage;

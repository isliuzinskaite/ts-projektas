import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetRegionQuery } from '../services/region-api';
import { Region } from '../types';
import getAdmin from '../services/get-admin';

const RegionForm = ({ region }: { region: Region }) => {
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
      const response = await fetch(`http://localhost:1337/api/regions/${region.id}`, {
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
        setSubmitError(`Atnaujinti regiono nepavyko, bandykite dar kartą. Klaida: ${responseJSON.error}`);
      }
    } catch (err) {
      setSubmitError('Atnaujinti regiono nepavyko, serverio klaida.');
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
        {`Redaguoti regioną ${region.name}`}
      </Typography>

      {!submitLoading
        && (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Regiono pavadinimas"
            name="name"
            autoComplete="false"
            autoFocus
            defaultValue={region.name}
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

const RegionEditPage: React.FC = () => {
  const [admin] = useState(getAdmin);

  const { regionId } = useParams() as { regionId: string };
  const {
    data: regionData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRegionQuery(regionId);

  let content;

  if (isLoading) {
    content = <>Kraunama...</>;
  } else if (isSuccess) {
    content = <RegionForm region={regionData.region} />;
  } else if (isError) {
    content = <>{error.toString()}</>;
  }
  return (
    <Container maxWidth="md" component="main">
      {content}
    </Container>
  );
};

export default RegionEditPage;

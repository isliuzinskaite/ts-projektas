import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import LocationDetails from '../components/location-details';
import getAdmin from '../services/get-admin';

const LocationPage: React.FC = () => {
  const [admin] = useState(getAdmin);
  const { locationId } = useParams() as { locationId: string };

  return (
    <Container sx={{ mt: 4 }}>
      <LocationDetails />
      {admin
        && (
          <Box sx={{ mt: 4, p: 1.5 }}>
            <Button href={`/locations/${locationId}/properties/new`} variant="contained">Pridėti būstą</Button>
          </Box>
        )}
    </Container>
  );
};

export default LocationPage;

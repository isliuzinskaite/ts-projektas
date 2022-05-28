import React from 'react';
import {
  Container,
} from '@mui/material';
import LocationDetails from '../components/location-details';

const LocationPage: React.FC = () => (
  <Container sx={{ mt: 4 }}>
    <LocationDetails />
  </Container>
);

export default LocationPage;

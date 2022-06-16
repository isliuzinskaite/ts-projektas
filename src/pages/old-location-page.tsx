import React from 'react';
import {
  Container,
} from '@mui/material';
import OldLocationDetails from '../components/old-location-details';

const OldLocationPage: React.FC = () => (
  <Container sx={{ mt: 4 }}>
    <OldLocationDetails />
  </Container>
);

export default OldLocationPage;

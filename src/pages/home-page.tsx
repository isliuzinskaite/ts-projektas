import React from 'react';
import {
  Container,
  Paper,
  Typography,
} from '@mui/material';
import Locations from '../components/locations';

const HomePage: React.FC = () => (
  <Container sx={{ mt: 4 }}>
    <Locations />
  </Container>
);

export default HomePage;

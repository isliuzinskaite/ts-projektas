import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
} from '@mui/material';
import Regions from '../components/regions';
import getAdmin from '../services/get-admin';

const HomePage: React.FC = () => {
  const [admin] = useState(getAdmin);

  return (
    <Container sx={{ mt: 4 }}>
      <Regions />
      {admin
        && (
          <Box sx={{ p: 1.5 }}>
            <Button href="/regions/new" variant="contained">Pridėti regioną</Button>
          </Box>
        )}
    </Container>
  );
};

export default HomePage;

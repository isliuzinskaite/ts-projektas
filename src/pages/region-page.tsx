import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import RegionDetails from '../components/region-details';
import getAdmin from '../services/get-admin';

const RegionPage: React.FC = () => {
  const [admin] = useState(getAdmin);
  const { regionId } = useParams() as { regionId: string };

  return (
    <Container sx={{ mt: 4 }}>
      <RegionDetails />
      {admin
        && (
          <Box sx={{ mt: 4, p: 1.5 }}>
            <Button href={`/regions/${regionId}/locations/new`} variant="contained">Pridėti vietovę</Button>
          </Box>
        )}
    </Container>
  );
};

export default RegionPage;

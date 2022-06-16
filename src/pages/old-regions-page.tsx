import React from 'react';
import {
  Box, Container, Typography,
} from '@mui/material';
import OldSection from '../components/old-section';
import OldVoteButton from '../components/old-voting';
import NamasImgSrc from './namas.jpg';
import OldLocationSelector from '../components/old-location-selector';

const OldRegionsPage: React.FC = () => (
  <Container sx={{ my: 5 }}>

    <OldVoteButton />
    <OldSection>
      <Typography component="h1" variant="h3">
        Vietovės
      </Typography>
      <Typography
        component="a"
        href="https://www.google.lt/maps/"
        target="blank"
      >
        Žemėlapis
      </Typography>
      <Box sx={{ mt: 4 }}>
        <OldLocationSelector />
      </Box>
    </OldSection>

    <OldSection>
      <img src={NamasImgSrc} alt="" />
    </OldSection>
  </Container>
);

export default OldRegionsPage;

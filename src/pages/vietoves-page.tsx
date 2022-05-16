import React from 'react';
import {
  Box, Container, Typography,
} from '@mui/material';
import Section from '../components/section';
import VoteButton from '../components/voting';
import NamasImgSrc from './namas.jpg';
import LocationSelector from '../components/locationSelector';

const VietovesPage: React.FC = () => (
  <Container sx={{ my: 5 }}>

    <VoteButton />
    <Section>
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
        <LocationSelector />
      </Box>
    </Section>

    <Section>
      <img src={NamasImgSrc} alt="" />
    </Section>
  </Container>
);

export default VietovesPage;

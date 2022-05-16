import React from 'react';
import {
  Box, Container, Typography, Button,
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

    <Section>
      <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
        SPALVOTAS PASAULIS
      </Typography>
      <Typography sx={{ color: 'red.main' }}>
        RAUDONA SPALVA REIŠKIA UGNĮ
      </Typography>
      <Typography sx={{ color: 'blue.main' }}>
        MĖLYNA SPALVA REIŠKIA ERDVĘ
      </Typography>
      <Typography sx={{ color: 'green.main' }}>
        ŽALIA SPALVA REIŠKIA PAVASARĮ
      </Typography>
    </Section>

    <Section>
      <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
        Spalvų mygtukai
      </Typography>
      <Button variant="contained" color="red">
        raudonas
      </Button>
      <Button variant="contained" color="green">
        žalias
      </Button>
      <Button variant="contained" color="blue">
        mėlynas
      </Button>
    </Section>
  </Container>
);

export default VietovesPage;

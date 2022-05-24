import React from 'react';
import {
  AppBar,
  Container,
  Box,
} from '@mui/material';
import NavbarLink from './navbar-link';

const Navbar: React.FC = () => (
  <AppBar position="static" sx={{ bgcolor: 'grey.900' }}>
    <Container sx={{ px: { xs: 0, sm: 0 } }}>
      <Box sx={(theme) => theme.mixins.navbar}>
        <Box sx={{ alignSelf: 'stretch' }}>
          <NavbarLink to="/">Pagrindinis</NavbarLink>
          <NavbarLink to="/vietoves">Vietovės</NavbarLink>
          <NavbarLink to="/ispudziai">Įspūdžiai</NavbarLink>
        </Box>
      </Box>
    </Container>
  </AppBar>
);

export default Navbar;

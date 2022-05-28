import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import NavbarLink from './navbar-link';

const Navbar: React.FC = () => (
  <AppBar position="static" sx={{ bgcolor: 'grey.900' }}>
    <Toolbar sx={{ flexWrap: 'wrap' }}>
      <Typography
        variant="h6"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        <Link href="/" underline="none">
          Nakvok
        </Link>
      </Typography>
      <Box sx={(theme) => theme.mixins.navbar}>
        <Box sx={{ alignSelf: 'stretch' }}>
          <NavbarLink to="/">Pagrindinis</NavbarLink>
          <NavbarLink to="/vietoves">Vietovės</NavbarLink>
          <NavbarLink to="/ispudziai">Įspūdžiai</NavbarLink>
        </Box>
      </Box>
      <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        Prisijungti
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;

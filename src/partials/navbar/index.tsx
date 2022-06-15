import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import NavbarLink from './navbar-link';

const Navbar: React.FC = () => {
  const [admin] = useState(() => {
    const adminString = localStorage.getItem('admin');
    if (adminString) {
      return JSON.parse(adminString);
    }
    return null;
  });

  // https://serverless-stack.com/chapters/load-the-state-from-the-session.html
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
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
        {admin
          && (
            <>
              <Typography>{admin.name}</Typography>
              <Button href="#" onClick={logout} sx={{ ml: 2 }}>Atsijungti</Button>
            </>
          )}
        {!admin
          && (
          <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Prisijungti
          </Button>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../partials/navbar';

const LandingPageLayout: React.FC = () => (
  <>
    <Navbar />
    <Box component="main">
      <Outlet />
    </Box>
  </>
);

export default LandingPageLayout;

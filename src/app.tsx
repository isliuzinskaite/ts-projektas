import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import HomePage from './pages/home-page';
import RegionsPage from './pages/regions-page';
import ImpressionsPage from './pages/impressions-page';
import LandingPageLayout from './layouts/landing-page-layout';
import LocationPage from './pages/location-page';
import LoginPage from './pages/login-page';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/location/:locationId" element={<LocationPage />} />
        <Route path="vietoves" element={<RegionsPage />} />
        <Route path="ispudziai" element={<ImpressionsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

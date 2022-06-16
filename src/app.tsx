import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import HomePage from './pages/home-page';
import LandingPageLayout from './layouts/landing-page-layout';
import LoginPage from './pages/login-page';

import RegionNewPage from './pages/region-new-page';
import RegionPage from './pages/region-page';
import RegionEditPage from './pages/region-edit-page';

import LocationNewPage from './pages/location-new-page';
import LocationPage from './pages/location-page';
import LocationEditPage from './pages/location-edit-page';

import PropertyNewPage from './pages/property-new-page';
import PropertyEditPage from './pages/property-edit-page';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/regions/new" element={<RegionNewPage />} />
        <Route path="/regions/:regionId" element={<RegionPage />} />
        <Route path="/regions/:regionId/edit" element={<RegionEditPage />} />

        <Route path="/regions/:regionId/locations/new" element={<LocationNewPage />} />
        <Route path="/locations/:locationId" element={<LocationPage />} />
        <Route path="/locations/:locationId/edit" element={<LocationEditPage />} />

        <Route path="/locations/:locationId/properties/new" element={<PropertyNewPage />} />
        <Route path="/properties/:propertyId/edit" element={<PropertyEditPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

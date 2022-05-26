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

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="vietoves" element={<RegionsPage />} />
        <Route path="ispudziai" element={<ImpressionsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

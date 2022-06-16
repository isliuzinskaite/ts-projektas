import React from 'react';
import {
  Button,
} from '@mui/material';
import { store } from '../store';

const LocationSelector: React.FC = () => {
  const state = store.getState();
  return (
    <div>
      {state.counter.data.map((entry, idx) => (
        <Button variant="contained">{entry.region}</Button>
      ))}
    </div>
  );
};

export default LocationSelector;

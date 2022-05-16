import React from 'react';
import {
  Button,
} from '@mui/material';
import { store } from '../store';

const state = store.getState();
console.log(state.counter.data);

const LocationSelector: React.FC = () => {
  const x = 'Labas';
  return (
    <div>
      {state.counter.data.map((entry, idx) => (
        <Button variant="contained">{entry.region}</Button>
      ))}
    </div>
  );
};

export default LocationSelector;

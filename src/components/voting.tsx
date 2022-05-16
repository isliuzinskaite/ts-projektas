import React from 'react';
import {
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { increment } from '../counterSlice';

const Voting: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.values.reduce((a, b) => a + b, 0));
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => dispatch(increment())}
      >
        Balsuoti
      </Button>
      <div>
        Balsai:
        {count}
      </div>
    </div>
  );
};

export default Voting;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { increment } from '../counterSlice';

const Voting: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.values.reduce((a, b) => a + b, 0));
  const dispatch = useDispatch();
  return (
    <div>
      <button
        type="button"
        aria-label="Vote"
        onClick={() => dispatch(increment())}
      >
        Vote
      </button>
      <div>
        Balsai:
        {count}
      </div>
    </div>
  );
};

export default Voting;

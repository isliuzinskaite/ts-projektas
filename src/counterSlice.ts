import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Entry { [key: string]: (string | number); }

export interface CounterState {
  data: Entry[],
  values: number[]
}

const initialState: CounterState = {
  values: [],
  data: [
    {
      id: 'mazoji-lietuva',
      region: 'Mažoji Lietuva',
      name: 'Dvaras A',
      imageURL: '',
      clickCount: 0,
    },
    {
      id: 'zemaitija',
      region: 'Žemaitija',
      name: 'Dvaras B',
      imageURL: '',
      clickCount: 0,
    },
    {
      id: 'aukstaitija',
      region: 'Aukštaitija',
      name: 'Dvaras C',
      imageURL: '',
      clickCount: 0,
    },
    {
      id: 'suvalkija',
      region: 'Suvalkija',
      name: 'Dvaras D',
      imageURL: '',
      clickCount: 0,
    },
    {
      id: 'dzukija',
      region: 'Dzūkija',
      name: 'Dvaras E',
      imageURL: '',
      clickCount: 0,
    },
  ],
};

let clickCount = 0;

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.values.push(1);
    },
    get: (state) => {
      clickCount += 1;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, get } = counterSlice.actions;

export default counterSlice.reducer;

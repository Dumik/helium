import {configureStore} from '@reduxjs/toolkit';
import populationReducer from './populationSlice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    population: populationReducer,
  },
});

export default store;

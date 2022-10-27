import { configureStore } from '@reduxjs/toolkit';
import { phoneBookReducer, filtersReducer } from './slice';

export const store = configureStore({
  reducer: {
    phonebook: phoneBookReducer,
    filter: filtersReducer,
  },
});

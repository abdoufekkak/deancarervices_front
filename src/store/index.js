// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import processReducer from './processSlice';

export const store = configureStore({
  reducer: {
    process: processReducer,
  },
});

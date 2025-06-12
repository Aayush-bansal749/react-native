import {configureStore} from '@reduxjs/toolkit';
import TextReducer from '../slice/NotesSlice';

export const NotesStore = configureStore({
  reducer: {
    Texts: TextReducer,
  },
});

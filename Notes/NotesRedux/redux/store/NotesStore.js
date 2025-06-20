import {configureStore} from '@reduxjs/toolkit';
import persistedReducer from '../persist/NotesPersist';
import {persistStore} from 'redux-persist';

export const NotesStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const Persistor = persistStore(NotesStore);

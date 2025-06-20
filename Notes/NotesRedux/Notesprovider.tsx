import React from 'react';
import {Provider} from 'react-redux';
import {NotesStore, Persistor} from './redux/store/NotesStore';
import Notes from './Notes';
import {PersistGate} from 'redux-persist/integration/react';

const NotesProvider = () => {
  return (
    <Provider store={NotesStore}>
      <PersistGate loading={null} persistor={Persistor}>
        <Notes />
      </PersistGate>
    </Provider>
  );
};

export default NotesProvider;

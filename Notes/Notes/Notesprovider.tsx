import React from 'react';
import {Provider} from 'react-redux';
import {NotesStore} from './redux/store/NotesStore';
import Notes from './Notes';

const NotesProvider = () => {
  return (
    <Provider store={NotesStore}>
      <Notes />
    </Provider>
  );
};

export default NotesProvider;

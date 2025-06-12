import {createSlice} from '@reduxjs/toolkit';

export const TextSlice = createSlice({
  name: 'Texts',
  initialState: {
    notes: [],
    curr: '',
    editIndex: -1,
  },
  reducers: {
    addtext: state => {
      if (state.curr.trim() !== '') {
        if (state.editIndex !== -1) {
          state.notes[state.editIndex].value = state.curr;
          state.editIndex = -1;
        } else {
          state.notes.unshift({value: state.curr, isselected: false});
        }
        state.curr = '';
      }
    },
    deleteText: (state, action) => {
      state.notes.splice(action.payload, 1);
    },
    setCurr: (state, action) => {
      state.curr = action.payload;
    },
    toggleSelect: (state, action) => {
      state.notes[action.payload].isselected =
        !state.notes[action.payload].isselected;
    },
    deleteAll: state => {
      state.notes = state.notes.filter(note => !note.isselected);
    },
    editText: (state, action) => {
      state.editIndex = action.payload;
      state.curr = state.notes[action.payload].value;
    },
  },
});

export const {addtext, deleteAll, deleteText, setCurr, toggleSelect, editText} =
  TextSlice.actions;

export default TextSlice.reducer;

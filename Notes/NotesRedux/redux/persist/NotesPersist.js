import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import TextReducer from '../slice/NotesSlice';
import ListReducer from '../slice/ListSlice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Texts'],
};

const rootReducer = combineReducers({
  Texts: TextReducer,
  ListItems: ListReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchList = createAsyncThunk(
  'ListItems/fetchList',
  async (_, {getState}) => {
    const state = getState().ListItems;
    const response = await axios.get(
      'https://api.escuelajs.co/api/v1/products',
      {
        params: {
          offset: state.offset,
          limit: 10,
        },
      },
    );
    return response.data;
  },
);

export const ListSlice = createSlice({
  name: 'ListItems',
  initialState: {
    data: [],
    isLoading: true,
    isRefreshing: false,
    offset: 0,
  },
  reducers: {
    refresh: state => {
      state.isRefreshing = true;
      state.isLoading = true;
      state.offset = 0;
      fetchList();
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchList.fulfilled, (state, action) => {
      console.log('Fetched payload:', action.payload);
      if (!state.isRefreshing) {
        state.data = [...state.data, ...action.payload];
      } else {
        state.data = action.payload;
        state.isRefreshing = false;
      }
      if (action.payload.length < 10) {
        state.isLoading = false;
      }
      state.offset += 10;
    });
  },
});

export const {refresh} = ListSlice.actions;

export default ListSlice.reducer;

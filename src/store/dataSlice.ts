import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  all: any[];
  filtered: any[];
  filter:  string;
  deleted: string;
}

const initialState: DataState = {
  all: [],
  filtered: [],
  filter: 'all',
  deleted: ''
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAllData: (state, action: PayloadAction<any[]>) => {
      state.all = action.payload;
    },
    setFilteredData: (state, action: PayloadAction<any[]>) => {
      state.filtered = action.payload;
    },
    setFilter(state, action: PayloadAction<'all' | 'liked'>) {
        state.filter = action.payload;
      },
    setDeletedMode(state, action: PayloadAction<'' | 'active'>) {
        state.deleted = action.payload;
    },
  },
});

export const { setAllData, setFilteredData, setFilter, setDeletedMode } = dataSlice.actions;
export default dataSlice.reducer;
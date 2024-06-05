import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for individual items
interface Item {
  id: number;
  title: string;
  description: string;
  images: string[];
}

// Define the shape of the Redux state
interface DataState {
  all: Item[];
  filtered: Item[];
  filter: 'all' | 'liked';
  deleted: '' | 'active';
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
    setAllData: (state, action: PayloadAction<Item[]>) => {
      state.all = action.payload;
    },
    setFilteredData: (state, action: PayloadAction<Item[]>) => {
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
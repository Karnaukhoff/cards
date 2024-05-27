import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  all: any[];
  filtered: any[];
  filter:  string
}

const initialState: DataState = {
  all: [],
  filtered: [],
  filter: 'all',
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
        //state.filtered = action.payload === 'liked' ? state.all.filter(card => card.liked) : state.all;
      },
  },
});

export const { setAllData, setFilteredData, setFilter } = dataSlice.actions;
export default dataSlice.reducer;
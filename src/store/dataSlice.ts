import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  all: any[];
  filtered: any[];
}

const initialState: DataState = {
  all: [],
  filtered: [],
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
  },
});

export const { setAllData, setFilteredData } = dataSlice.actions;
export default dataSlice.reducer;
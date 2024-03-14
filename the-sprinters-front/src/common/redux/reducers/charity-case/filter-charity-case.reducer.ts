import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    input : string;
}

export type FilterCharityCaseState = Readonly<typeof initialState>;

export const initialState: InitialState = {
  input: '',
};

export const FilterCharityCaseSlice = createSlice({
  name: 'charityCase',
  initialState: initialState as FilterCharityCaseState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
  },
});

export default FilterCharityCaseSlice.reducer;
export const { setInput } = FilterCharityCaseSlice.actions;

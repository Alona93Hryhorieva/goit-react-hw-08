import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  number: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterName: (state, action) => {
      state.name = action.payload;
    },
    setFilterNumber: (state, action) => {
      state.number = action.payload;
    },
  },
});

export const { setFilterNumber, setFilterName } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

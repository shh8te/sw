import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export type CharacterListState = {
  page: number;
  query: string;
};

export const initialState: CharacterListState = {
  page: 1,
  query: "",
};

export const characterListSlice = createSlice({
  name: "characterList",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const selectCharacterListState = (state: RootState) =>
  state.characterList;

export const { setPage, setQuery } = characterListSlice.actions;

export default characterListSlice.reducer;

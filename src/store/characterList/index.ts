import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
    setParameters: (
      state,
      action: PayloadAction<{
        page: number;
        query: string;
      }>
    ) => {
      state.page = action.payload.page;
      state.query = action.payload.query;
    },
  },
});

export const selectCharacterListState = (state: RootState) =>
  state.characterList;

export const { setParameters } = characterListSlice.actions;

export default characterListSlice.reducer;

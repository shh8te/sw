import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_BASE_URL } from "config";
import { Data, Person } from "types";

interface CharactersState {
  list: Record<string, Person> | null;
  showNextPage: boolean;
  showPrevPage: boolean;
  loading: "idle" | "pending";
  error: string | null;
  editedCharacters: Record<string, Person>;
}

const initialState: CharactersState = {
  list: null,
  showNextPage: false,
  showPrevPage: false,
  loading: "idle",
  error: null,
  editedCharacters: {},
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Person[]>) => {
      state.list = action.payload.reduce((obj, character) => {
        if (character) {
          return Object.assign(obj, { [`${character.name}`]: character });
        } else {
          return {};
        }
      }, {});
    },
    editCharacter: (
      state,
      action: PayloadAction<{ name: string; character: Person }>
    ) => {
      const { name, character } = action.payload;
      state.editedCharacters[name] = character;
    },
  },
});

export const { editCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;

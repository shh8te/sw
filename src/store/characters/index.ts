import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "types";

type Loading = "idle" | "pending";

type LastFetchedParameters = {
  page: number | null;
  query: string;
};

type CharactersState = {
  list: Record<string, Person> | null;
  showNextPage: boolean;
  showPrevPage: boolean;
  loading: Loading;
  error: string | null;
  editedCharacters: Record<string, Person>;
  lastFetchedParameters: LastFetchedParameters;
};

const initialState: CharactersState = {
  list: null,
  showNextPage: false,
  showPrevPage: false,
  loading: "idle",
  error: null,
  editedCharacters: {},
  lastFetchedParameters: {
    page: null,
    query: "",
  },
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    editCharacter: (
      state,
      action: PayloadAction<{ name: string; character: Person }>
    ) => {
      const { name, character } = action.payload;
      state.editedCharacters[name] = character;
    },
    setLoading: (state) => {
      state.list = null;
      state.showNextPage = false;
      state.showPrevPage = false;
      state.loading = "pending";
      state.error = null;
    },
    setSuccess: (
      state,
      action: PayloadAction<{
        list: Person[];
        showNextPage: boolean;
        showPrevPage: boolean;
        loading: Loading;
        lastFetchedParameters: LastFetchedParameters;
      }>
    ) => {
      state.list = action.payload.list.reduce((obj, character) => {
        if (character) {
          return Object.assign(obj, { [`${character.name}`]: character });
        } else {
          return {};
        }
      }, {});
      state.showNextPage = action.payload.showNextPage;
      state.showPrevPage = action.payload.showPrevPage;
      state.loading = action.payload.loading;
      state.lastFetchedParameters = action.payload.lastFetchedParameters;
    },
    setError: (
      state,
      action: PayloadAction<{
        error: string;
      }>
    ) => {
      state.list = null;
      state.showNextPage = false;
      state.showPrevPage = false;
      state.loading = "idle";
      state.error = action.payload.error;
      state.lastFetchedParameters = {
        page: null,
        query: "",
      };
    },
  },
});

export const { editCharacter, setLoading, setSuccess, setError } =
  charactersSlice.actions;

export default charactersSlice.reducer;

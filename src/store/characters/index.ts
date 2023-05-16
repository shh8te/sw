import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_BASE_URL } from "config";
import { RootState } from "store";
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

export const fetchCharacterList = createAsyncThunk(
  "swapi/fetchPeople",
  async ({ page, query }: { page: number; query: string }) => {
    const url = new URL(`${API_BASE_URL}/people`);

    if (query) {
      url.searchParams.set("search", query);
    }
    if (page) {
      url.searchParams.set("page", page.toString());
    }

    const response = await fetch(url);
    const data: Data = await response.json();

    return {
      data: data.results,
      showNextPage: !!data.next,
      showPrevPage: !!data.previous,
    };
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterList.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCharacterList.fulfilled, (state, action) => {
        state.loading = "idle";
        state.error = null;
        state.list = action.payload.data.reduce((acc, character) => {
          if (character) {
            return Object.assign(acc, { [`${character.name}`]: character });
          } else {
            return {};
          }
        }, {});
        state.showNextPage = action.payload.showNextPage;
        state.showPrevPage = action.payload.showPrevPage;
      })
      .addCase(fetchCharacterList.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const { editCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;

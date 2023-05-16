import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import characterListReducer from "store/characterList";
import charactersReducer from "store/characters";

const rootReducer = {
  characterList: characterListReducer,
  characters: charactersReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

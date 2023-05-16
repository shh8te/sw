import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";
import { Person } from "types";

const selectCharacters = (state: RootState) => state.characters.list;
const selectEditedCharacters = (state: RootState) =>
  state.characters.editedCharacters;

export const selectCharactersState = (state: RootState) => state.characters;
export const selectMergedCharacters = createSelector(
  [selectCharacters, selectEditedCharacters],
  (characters, editedCharacters) => {
    if (!characters) {
      return {
        ...editedCharacters,
      };
    }

    const mergedCharacters: Record<string, Person> = {
      ...characters,
    };

    Object.keys(characters).forEach((name) => {
      mergedCharacters[name] = {
        ...mergedCharacters[name],
        ...editedCharacters[name],
      };
    });

    return mergedCharacters;
  }
);
export const selectCharacterByName = createSelector(
  [selectMergedCharacters, (_state, name) => name],
  (mergedCharacters, name) => {
    const characterName =
      Object.keys(mergedCharacters).find(
        (characterName) => characterName === name
      ) ?? "";

    return mergedCharacters[characterName];
  }
);

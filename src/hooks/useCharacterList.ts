import { useSelector } from "react-redux";
import {
  setPage,
  selectCharacterListState,
  setQuery,
  initialState,
} from "store/characterList";
import { fetchCharacterList } from "store/characters";
import {
  selectCharactersState,
  selectMergedCharacters,
} from "store/characters/selectors";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { API_SEARCH_INPUT_DELAY } from "config";
import { useDebounce } from "./useDebounce";

export const useCharacterList = () => {
  const dispatch = useAppDispatch();
  const { page, query } = useSelector(selectCharacterListState);
  const mergedCharacters = useSelector(selectMergedCharacters);
  const { loading, error, showNextPage, showPrevPage, list } = useSelector(
    selectCharactersState
  );

  useEffect(() => {}, [dispatch, query, page]);

  const handleSearchChange = useCallback(
    (query: string) => {
      dispatch(setQuery(query));
      if (page > 1) dispatch(setPage(1));
    },
    // To avoid issue related to pagination
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch(setPage(newPage));
    },
    [dispatch]
  );

  return {
    mergedCharacters,
    showNextPage,
    showPrevPage,
    loading,
    error,
    handlePageChange,
    handleSearchChange,
  };
};

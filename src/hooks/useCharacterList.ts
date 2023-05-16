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
import { useEffect, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState(query);
  const [currentPage, setCurrentPage] = useState(page);
  const debouncedSearchQuery = useDebounce(searchQuery, API_SEARCH_INPUT_DELAY);

  useEffect(() => {
    if (!list) {
      dispatch(fetchCharacterList({ page, query }));

      return;
    }

    if (query !== debouncedSearchQuery) {
      setCurrentPage(initialState.page); // reset page to view results from the beginning
      dispatch(setQuery(debouncedSearchQuery));

      return;
    }

    if (page !== currentPage) {
      dispatch(setPage(currentPage));
      dispatch(fetchCharacterList({ page: currentPage, query }));

      return;
    }
  }, [
    dispatch,
    debouncedSearchQuery,
    currentPage,
    mergedCharacters,
    query,
    page,
    list,
  ]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  return {
    mergedCharacters,
    showNextPage,
    showPrevPage,
    loading,
    error,
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearchChange,
  };
};

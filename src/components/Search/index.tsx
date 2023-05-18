import { API_SEARCH_INPUT_DELAY } from "config";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { selectCharacterListState, setParameters } from "store/characterList";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { SearchField } from "./styles";

export const Search = () => {
  const dispatch = useAppDispatch();
  const { query } = useSelector(selectCharacterListState);
  const [searchValue, setSearchValue] = useState(query);

  const handleSearchChange = useCallback(
    (query: string) => {
      dispatch(
        setParameters({
          page: 1,
          query,
        })
      );
    },
    [dispatch]
  );

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue !== query) {
      const handler = setTimeout(() => {
        handleSearchChange(searchValue);
      }, API_SEARCH_INPUT_DELAY);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [query, searchValue, handleSearchChange]);

  return (
    <SearchField
      id="main-search-input"
      label="Search"
      variant="outlined"
      value={searchValue}
      onChange={handleSearchValueChange}
      fullWidth
    />
  );
};

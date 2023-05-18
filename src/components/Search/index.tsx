import { TextField, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { API_SEARCH_INPUT_DELAY } from "config";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { selectCharacterListState, setParameters } from "store/characterList";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";

const useStyles = makeStyles((theme: Theme) => ({
  searchInput: {
    marginBottom: theme.spacing(2),
  },
}));

export const Search = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
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
    <TextField
      id="main-search-input"
      className={classes.searchInput}
      label="Search"
      variant="outlined"
      value={searchValue}
      onChange={handleSearchValueChange}
      fullWidth
    />
  );
};

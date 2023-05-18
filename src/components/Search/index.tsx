import { TextField, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { API_SEARCH_INPUT_DELAY } from "config";
import { ChangeEvent, useEffect, useState } from "react";
import { selectCharacterListState } from "store/characterList";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
  searchInput: {
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  setSearchQuery: (query: string) => void;
};

export const Search = ({ setSearchQuery }: Props) => {
  const classes = useStyles();
  const { query } = useSelector(selectCharacterListState);
  const [searchValue, setSearchValue] = useState(query);

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue !== query) {
      const handler = setTimeout(() => {
        setSearchQuery(searchValue);
      }, API_SEARCH_INPUT_DELAY);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [query, searchValue, setSearchQuery]);

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

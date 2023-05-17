import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Grid,
  TextField,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Theme,
  Container,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useCharacterList } from "hooks/useCharacterList";
import { API_ROUTES, API_SEARCH_INPUT_DELAY } from "config";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "hooks/useDebounce";

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
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const debouncedSearchValue = useDebounce(searchValue, API_SEARCH_INPUT_DELAY);
  const {
    mergedCharacters,
    showPrevPage,
    showNextPage,
    loading,
    error,
    handlePageChange,
    handleSearchChange,
  } = useCharacterList();

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchValue !== undefined) {
      setSearchQuery(debouncedSearchValue);
    }
  }, [debouncedSearchValue, setSearchQuery]);

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

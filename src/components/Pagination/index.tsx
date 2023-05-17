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
import { StyledLink } from "./styles";
import { API_ROUTES } from "config";
import { Search } from "components/Search";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  searchInput: {
    marginBottom: theme.spacing(2),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
    color: theme.palette.error.main,
  },
  characterCard: {
    height: "100%",
  },
  paginationContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paginationText: {
    marginRight: theme.spacing(2),
  },
  paginationButtons: {
    display: "flex",
  },
}));

export const Pagination = () => {
  const classes = useStyles();

  return (
    <div className={classes.paginationContainer}>
      <Typography
        id="main-pagintaion-page"
        variant="body1"
        className={classes.paginationText}
      >
        Page: {currentPage}
      </Typography>
      <div id="main-pagination-buttons" className={classes.paginationButtons}>
        <IconButton
          color="primary"
          disabled={!showPrevPage}
          onClick={handlePrevPageClick}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          color="primary"
          disabled={!showNextPage}
          onClick={handleNextPageClick}
        >
          <ChevronRight />
        </IconButton>
      </div>
    </div>
  );
};

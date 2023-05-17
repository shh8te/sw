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

export const Main = () => {
  const classes = useStyles();
  const {
    mergedCharacters,
    showPrevPage,
    showNextPage,
    loading,
    error,
    // currentPage,
    // searchQuery,
    handlePageChange,
    handleSearchChange,
  } = useCharacterList();

  const handleNextPageClick = () => handlePageChange(currentPage + 1);
  const handlePrevPageClick = () => handlePageChange(currentPage - 1);

  if (loading === "pending") {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.errorContainer}>
        <Typography variant="body1">{error}</Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {/* <TextField
        id="main-search-input"
        className={classes.searchInput}
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
      /> */}
      <Search setSearchQuery={handleSearchChange} />
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={2}>
          {Object.keys(mergedCharacters)?.map((characterName, index) => (
            <Grid key={characterName} item xs={12} sm={6} md={4} lg={3}>
              <StyledLink
                to={API_ROUTES.CURRENT_CHARACTER(
                  encodeURIComponent(characterName)
                )}
              >
                <Card id={`card-${index}`} className={classes.characterCard}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {mergedCharacters[characterName].name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Birth Year: {mergedCharacters[characterName].birth_year}
                    </Typography>
                    {/* Add more details here */}
                  </CardContent>
                </Card>
              </StyledLink>
            </Grid>
          ))}
        </Grid>
        <div className={classes.paginationContainer}>
          <Typography
            id="main-pagintaion-page"
            variant="body1"
            className={classes.paginationText}
          >
            Page: {currentPage}
          </Typography>
          <div
            id="main-pagination-buttons"
            className={classes.paginationButtons}
          >
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
      </Container>
    </div>
  );
};

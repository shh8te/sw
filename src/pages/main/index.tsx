import { useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Theme,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { StyledLink } from "./styles";
import { API_BASE_URL, API_ROUTES } from "config";
import { Search } from "components/Search";
import { Pagination } from "components/Pagination";
import { useSelector } from "react-redux";
import {
  selectCharactersState,
  selectMergedCharacters,
} from "store/characters/selectors";
import { useAppDispatch } from "store";
import { selectCharacterListState } from "store/characterList";
import { deepCompareSimpleObjects } from "utils";
import { setError, setLoading, setSuccess } from "store/characters";
import { Data } from "types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const Main = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { loading, error, lastFetchedParameters } = useSelector(
    selectCharactersState
  );
  const mergedCharacters = useSelector(selectMergedCharacters);
  const parameters = useSelector(selectCharacterListState);

  useEffect(() => {
    if (!deepCompareSimpleObjects(lastFetchedParameters, parameters)) {
      const fetchCharacters = async () => {
        try {
          dispatch(setLoading());

          const url = new URL(`${API_BASE_URL}/people`);

          if (parameters.query) {
            url.searchParams.set("search", parameters.query);
          }
          if (parameters.page) {
            url.searchParams.set("page", parameters.page.toString());
          }

          const response = await fetch(url);

          if (response.ok) {
            const data: Data = await response.json();

            dispatch(
              setSuccess({
                list: data.results,
                showNextPage: !!data.next,
                showPrevPage: !!data.previous,
                loading: "idle",
                lastFetchedParameters: parameters,
              })
            );
          }
        } catch (error) {
          console.error(
            `An error occurred while fetching characters: ${error}`
          );

          dispatch(
            setError({
              error: `${error}`,
            })
          );
        }
      };

      fetchCharacters();
    }
  }, [dispatch, lastFetchedParameters, parameters]);

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
      <Search />
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
                    {/* Add more details here if needed */}
                  </CardContent>
                </Card>
              </StyledLink>
            </Grid>
          ))}
        </Grid>
        <Pagination />
      </Container>
    </div>
  );
};

import { useEffect } from "react";
import { Grid, CircularProgress, Typography, CardContent } from "@mui/material";
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
import {
  StyledLink,
  CharacterCard,
  ErrorContainer,
  LoadingContainer,
  MainContainer,
  MainContent,
} from "./styles";

export const Main = () => {
  const dispatch = useAppDispatch();
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
      <LoadingContainer component="div">
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer component="div">
        <Typography variant="body1">{error}</Typography>
      </ErrorContainer>
    );
  }

  return (
    <MainContainer component="div">
      <Search />
      <MainContent maxWidth="md">
        <Grid container spacing={2}>
          {Object.keys(mergedCharacters)?.map((characterName, index) => (
            <Grid key={characterName} item xs={12} sm={6} md={4} lg={3}>
              <StyledLink
                to={API_ROUTES.CURRENT_CHARACTER(
                  encodeURIComponent(characterName)
                )}
              >
                <CharacterCard id={`card-${index}`}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {mergedCharacters[characterName].name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Birth Year: {mergedCharacters[characterName].birth_year}
                    </Typography>
                    {/* Add more details here if needed */}
                  </CardContent>
                </CharacterCard>
              </StyledLink>
            </Grid>
          ))}
        </Grid>
        <Pagination />
      </MainContent>
    </MainContainer>
  );
};

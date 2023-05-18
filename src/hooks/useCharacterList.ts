import { useSelector } from "react-redux";
import { selectCharacterListState, setParameters } from "store/characterList";
import { setLoading, setSuccess, setError } from "store/characters";
import { selectCharactersState } from "store/characters/selectors";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "store";
import { API_BASE_URL } from "config";
import { Data } from "types";
import { deepCompareSimpleObjects } from "utils";

export const useCharacterList = () => {
  const dispatch = useAppDispatch();
  const parameters = useSelector(selectCharacterListState);
  const { lastFetchedParameters } = useSelector(selectCharactersState);

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

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch(
        setParameters({
          ...parameters,
          page: newPage,
        })
      );
    },
    [dispatch, parameters]
  );

  return {
    page: parameters.page,
    handlePageChange,
    handleSearchChange,
  };
};

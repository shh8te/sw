import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { selectCharacterListState, setParameters } from "store/characterList";
import { selectCharactersState } from "store/characters/selectors";
import {
  PaginationButtonsContainer,
  PaginationContainer,
  PaginationText,
} from "./styles";

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const parameters = useSelector(selectCharacterListState);
  const { showNextPage, showPrevPage } = useSelector(selectCharactersState);

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

  const handleNextPageClick = () => handlePageChange(parameters.page + 1);
  const handlePrevPageClick = () => handlePageChange(parameters.page - 1);

  return (
    <PaginationContainer component="div">
      <PaginationText id="main-pagintaion-page" variant="body1">
        Page: {parameters.page}
      </PaginationText>
      <PaginationButtonsContainer component="div" id="main-pagination-buttons">
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
      </PaginationButtonsContainer>
    </PaginationContainer>
  );
};

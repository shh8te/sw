import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Typography, Theme, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { selectCharacterListState, setParameters } from "store/characterList";
import { selectCharactersState } from "store/characters/selectors";

const useStyles = makeStyles((theme: Theme) => ({
  paginationContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationText: {
    marginRight: theme.spacing(2),
  },
  paginationButtons: {
    display: "flex",
  },
}));

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
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
    <div className={classes.paginationContainer}>
      <Typography
        id="main-pagintaion-page"
        variant="body1"
        className={classes.paginationText}
      >
        Page: {parameters.page}
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

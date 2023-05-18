import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Typography, Theme, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

type Props = {
  currentPage: number;
  showPrevPage: boolean;
  showNextPage: boolean;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  showNextPage,
  showPrevPage,
  onPageChange,
}: Props) => {
  const classes = useStyles();

  const handleNextPageClick = () => onPageChange(currentPage + 1);
  const handlePrevPageClick = () => onPageChange(currentPage - 1);

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

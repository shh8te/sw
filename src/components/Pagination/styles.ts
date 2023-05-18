import { styled as MUIStyled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const PaginationContainer = MUIStyled(Box)({
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const PaginationText = MUIStyled(Typography)({
  marginRight: "10px",
});

export const PaginationButtonsContainer = MUIStyled(Box)({
  display: "flex",
});

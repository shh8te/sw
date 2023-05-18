import { styled as MUIStyled } from "@mui/material/styles";
import { Card, Button, Box } from "@mui/material";

export const CharacterDetailsCard = MUIStyled(Card)({
  height: "100%",
});

export const StyledButton = MUIStyled(Button)({
  margin: "20px 0",

  ":not(:last-child)": {
    marginRight: "20px",
  },
});

export const ButtonsContainer = MUIStyled(Box)({
  display: "flex",
});

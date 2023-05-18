import styled from "styled-components";
import { styled as MUIStyled } from "@mui/material/styles";
import { Card, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const MainContainer = MUIStyled(Box)({
  flexGrow: 1,
  padding: 3,
});

export const MainContent = MUIStyled(Container)({
  padding: "20px 0",
});

export const CharacterCard = MUIStyled(Card)({
  height: "100%",
});

export const ErrorContainer = MUIStyled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  color: "error.main",
});

export const LoadingContainer = MUIStyled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
});

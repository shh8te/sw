import {
  Card,
  CardContent,
  Grid,
  Typography,
  Theme,
  Button,
  Input,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Person } from "types";
import { useState } from "react";
import { RootState } from "store";
import { useNavigate, useParams } from "react-router-dom";
import { editCharacter } from "store/characters";
import { selectCharacterByName } from "store/characters/selectors";

const useStyles = makeStyles((theme: Theme) => ({
  characterCard: {
    height: "100%",
  },
  backButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  editButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export const Character = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { name } = useParams();
  const character = useSelector((state) =>
    selectCharacterByName(state as RootState, name ?? "")
  );
  const navigate = useNavigate();
  const [isEdit, setEdit] = useState(false);
  const [editedName, setEditedName] = useState(character?.name ?? "");

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const handleInputNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };
  const handleSaveClick = () => {
    setEdit(false);
    const newCharacter = { ...character } as Person;
    newCharacter.name = editedName;
    dispatch(editCharacter({ name: `${name}`, character: newCharacter }));
  };

  return (
    <Grid item key={character?.name} xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.characterCard}>
        <CardContent>
          <Button
            variant="outlined"
            color="primary"
            className={classes.backButton}
            onClick={handleGoBack}
          >
            Back
          </Button>
          {isEdit ? (
            <Input value={editedName} onChange={handleInputNewName} />
          ) : (
            <Typography variant="h6" component="h3" gutterBottom>
              {editedName}
            </Typography>
          )}
          <Typography variant="body2" color="textSecondary">
            Birth Year: {character?.birth_year}
          </Typography>
          {/* Add more details here if needed */}
          {isEdit ? (
            <Button
              variant="outlined"
              color="primary"
              className={classes.editButton}
              onClick={handleSaveClick}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              className={classes.editButton}
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

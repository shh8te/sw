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
import { useCharacter } from "hooks/useCharacter";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  searchInput: {
    marginBottom: theme.spacing(2),
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
  paginationContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paginationText: {
    marginRight: theme.spacing(2),
  },
  paginationButtons: {
    display: "flex",
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
  const {
    character,
    isEdit,
    editedName,
    handleEdit,
    handleGoBack,
    handleInputNewName,
    handleSaveClick,
  } = useCharacter();
  const classes = useStyles();

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
          {/* Add more details here */}
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

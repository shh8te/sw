import { useDispatch, useSelector } from "react-redux";
import { Person } from "types";
import { useState } from "react";
import { selectCharacterByName } from "../store/characters/selectors";
import { RootState } from "store";
import { useNavigate, useParams } from "react-router-dom";
import { editCharacter } from "store/characters";

export const useCharacter = () => {
  const dispatch = useDispatch();
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

  return {
    character,
    isEdit,
    editedName,
    handleGoBack,
    handleEdit,
    handleInputNewName,
    handleSaveClick,
  };
};

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "pages/main";
import { Character } from "pages/character";
import { API_ROUTES } from "config";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={API_ROUTES.CHARACTERS} replace />}
      />
      <Route index path={API_ROUTES.CHARACTERS} element={<Main />} />
      <Route path={API_ROUTES.CURRENT_CHARACTER()} element={<Character />} />
      <Route path="*" element={<div>no such page</div>}></Route>
    </Routes>
  );
}

export default App;

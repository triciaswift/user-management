import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserList } from "./components/UserList";
import { UserForm } from "./components/UserForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path=":userId/edit" element={<UserForm />} />
    </Routes>
  );
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserList } from "./components/users/UserList";
import { EditUser } from "./components/forms/EditUser";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<UserList />} />
        <Route path=":userId/edit" element={<EditUser />} />
      </Route>
    </Routes>
  );
}

export default App;

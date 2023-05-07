import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from './pages/SignupPage/SignupPage'

import userService from "./utils/userService";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(userService.getUser())

function handleSignUpOrLogin() {
  setUser(userService.getUser())
}

function handleLogout() {
  userService.logout();
  setUser(null);
}

if (user) {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
       <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/:username"
          element={
            <ProfilePage loggedUser={user} handleLogout={handleLogout} />
          }
        />
    </Routes>
  );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );

}


export default App;

import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from './pages/SignupPage/SignupPage';
import MainPage from './pages/MainPage/MainPage'

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
    <Route
      path="/"
      element={<MainPage loggedInUser={user} handleLogout={handleLogout} />}
    />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
       <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        {/* <Route
          path="/:username"
          element={
            <ProfilePage loggedUser={user} handleLogout={handleLogout} />
          }
        /> */}
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

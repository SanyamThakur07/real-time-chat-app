import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { GridBackgroundDemo } from "./components/ui/background";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { authUser } = useAuthStore();
  return (
    <GridBackgroundDemo>
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </GridBackgroundDemo>
  );
}

export default App;

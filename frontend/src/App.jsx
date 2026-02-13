import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<ChatPage />} />
    </Routes>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="bg-red-400">
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;

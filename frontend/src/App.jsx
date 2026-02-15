import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader2 } from "lucide-react";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
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
  );
}

export default App;

import React, { useContext, useEffect, useState } from "react";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import { AuthContext } from "./authContext";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [userToken, setUserToken] = useState(null);

  const { state, dispatch } = useContext(AuthContext);
  const { token } = state;

  useEffect(() => {
    setUserToken(token);
  }, [token]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            {userToken === null ? <AdminLoginPage /> : <AdminDashboardPage />}
          </div>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

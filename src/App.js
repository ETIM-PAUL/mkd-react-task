import React, { useEffect, useState } from "react";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div>{token === null ? <AdminLoginPage /> : <AdminDashboardPage />}</div>
  );
}

export default App;

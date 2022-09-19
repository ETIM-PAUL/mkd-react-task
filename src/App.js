import React, { useContext, useEffect, useState } from "react";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import { AuthContext } from "./authContext";

function App() {
  const [userToken, setUserToken] = useState(null);

  const { state, dispatch } = useContext(AuthContext);
  const { token } = state;

  useEffect(() => {
    setUserToken(token);
  }, [token]);

  return (
    <div>{token === null ? <AdminLoginPage /> : <AdminDashboardPage />}</div>
  );
}

export default App;

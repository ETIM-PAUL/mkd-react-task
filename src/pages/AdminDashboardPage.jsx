import React, { useContext, useEffect } from "react";

import SnackBar from "../components/SnackBar";
import { GlobalContext, showToast } from "../globalContext";

const AdminDashboardPage = () => {
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    showToast(dispatch, "Logged in successfully");
  }, [dispatch]);

  return (
    <>
      <SnackBar />
    </>
  );
};

export default AdminDashboardPage;

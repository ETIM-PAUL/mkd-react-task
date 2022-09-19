import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated")
    ? localStorage.getItem("isAuthenticated")
    : false,
  user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  role: localStorage.getItem("role") ? localStorage.getItem("role") : null,
};

const reducer = (state, { payload, type }) => {
  switch (type) {
    case "LOGIN":
      localStorage.setItem("isAuthenticated", payload.token !== undefined);
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", payload.user);
      localStorage.setItem("role", payload.role);
      return {
        ...state,
        isAuthenticated: payload.token !== undefined,
        user: payload.user,
        token: payload.token,
        role: payload.role,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React, { useReducer } from "react";
export const GlobalContext = React.createContext();

const initialState = {
  globalMessage: "",
  isOpen: true,
  path: "",
};

const reducer = (state, { payload, type }) => {
  switch (type) {
    case "SNACKBAR":
      return {
        ...state,
        globalMessage: payload,
      };
    case "SETPATH":
      return {
        ...state,
        path: payload,
      };
    case "OPEN_SIDEBAR":
      return {
        ...state,
        isOpen: payload,
      };

    default:
      return state;
  }
};

export const showToast = (dispatch, message, timeout = 3000) => {
  dispatch({
    type: "SNACKBAR",
    payload: message,
  });

  setTimeout(() => {
    dispatch({
      type: "SNACKBAR",
      payload: {
        message: "",
      },
    });
  }, timeout);
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

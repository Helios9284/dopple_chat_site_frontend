import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider as StoreProvider } from 'react-redux'

import { store } from "./redux";
import App from "./App";
import RefContextProvider from './contexts/RefContextProvider';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <StoreProvider store={store}>
    <GoogleOAuthProvider clientId="906688676122-uh277o8rlmt1pnas9gkgob0fdlsfr8uu.apps.googleusercontent.com">
      <RefContextProvider>
        <App />
      </RefContextProvider>
    </GoogleOAuthProvider>
  </StoreProvider>
  // </React.StrictMode>
);

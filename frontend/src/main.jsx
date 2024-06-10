import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./store/auth";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              newestOnTop={true}
            />
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

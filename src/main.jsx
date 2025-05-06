import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import GoogleMapProvider from "./config/GoogleMapProvider.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleMapProvider>
    <Provider store={store}>
      
    <App/>
    </Provider>
    </GoogleMapProvider>
  </StrictMode>
);

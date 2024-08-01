import React from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGave } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGave loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGave>
    </Provider>
  </React.StrictMode>
);

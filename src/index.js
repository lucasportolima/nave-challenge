import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import * as serviceWorker from "./serviceWorker";
import App from "./App";
import store from "./store";

import "./assets/stylesheets/global.css";
import "./assets/stylesheets/forms.css";
import "./assets/icons/style.css";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

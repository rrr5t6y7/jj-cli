import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/Nav";
import getRouter from "./router";
import { Provider } from "react-redux";
import store from "./redux/store";
import styles from "./index.scss";
import "../mock/mock.js";

ReactDom.render(
  <Provider store={store}>
    <Router>
      <Nav />
      <div className={styles.contentBox}>{getRouter()}</div>
    </Router>
  </Provider>,
  document.getElementById("app")
);

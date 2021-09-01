import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "./index.css";
import App from "./App";
import ReactAssi from "./reactAssi";

import { Provider } from "react-redux";
import STORE from "./store";

ReactDOM.render(
  <Router>
    <Provider store={STORE}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/reactAssi.js" component={ReactAssi} />
      </div>
    </Provider>
  </Router>,

  document.getElementById("root")
);

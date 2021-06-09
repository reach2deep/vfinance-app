import "./App.css";

import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ExpenseDetail from "./expense-detail";
import ExpenseList from "./expense-list";
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/expenses" exact={true} component={ExpenseList} />
          <Route path="/expenses/:id" component={ExpenseDetail} />
        </Switch>
      </Router>
    );
  }
}

export default App;

import "./App.css";

import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import CustomerList from "./customer-list";
import ExpenseDetail from "./expense-detail";
import ExpenseList from "./expense-list";
import Home from "./Home";
import customerDetail from "./customer-detail";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/expenses" exact={true} component={ExpenseList} />
          <Route path="/expenses/:id" component={ExpenseDetail} />
          <Route path="/customers" exact={true} component={CustomerList} />
          <Route path="/customers/:id" component={customerDetail} />
        </Switch>
      </Router>
    );
  }
}

export default App;

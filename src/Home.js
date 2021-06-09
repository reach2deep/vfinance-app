import "./App.css";

import { Button, Container } from "reactstrap";
import React, { Component } from "react";

import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <Button color="link">
            <Link to="/expenses">Manage Expense List</Link>
          </Button>
        </Container>
      </div>
    );
  }
}

export default Home;

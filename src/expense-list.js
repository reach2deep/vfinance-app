import { Button, ButtonGroup, Container, Table } from "reactstrap";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  Sort,
} from "@syncfusion/ej2-react-grids";
import React, { Component } from "react";

import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

class ExpenseList extends Component {
  constructor(props) {
    super(props);
    this.state = { expenses: [], isLoading: true };
    this.remove = this.remove.bind(this);
    this.template = this.gridTemplate;
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://localhost:5000/api/Expense")
      .then((response) => response.json())
      .then((data) =>
        this.setState({ expenses: data.result, isLoading: false })
      );
  }

  async remove(id) {
    await fetch(`http://localhost:5000/api/Expense/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedExpenses = [...this.state.expenses].filter((i) => i.id !== id);
      this.setState({ expenses: updatedExpenses });
    });
  }

  gridTemplate(props) {
    return (
      <div className="image">
        <Button
          size="sm"
          color="primary"
          tag={Link}
          to={"/expenses/" + props.id}
        >
          Edit
        </Button>
      </div>
    );
  }

  render() {
    const { expenses, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/expenses/new">
              Add Expense
            </Button>
          </div>
          <h3>Expense List</h3>
          <GridComponent dataSource={expenses}>
            <ColumnsDirective>
              <ColumnDirective
                headerText="Date"
                field="expenseDate"
                width="50"
                type="datetime"
                format="dd/MM/yyyy"
              />
              <ColumnDirective
                field="category"
                headerText="Category"
                width="100"
              />
              <ColumnDirective
                headerText="Amount"
                field="amount"
                width="50"
                format="n2"
                textAlign="Right"
              />
              <ColumnDirective
                headerText="Description"
                field="description"
                width="100"
              />
              <ColumnDirective
                headerText="CreatedBy"
                field="createdBy"
                width="100"
              />
              <ColumnDirective
                headerText="Actions"
                width="180"
                template={this.template}
                textAlign="Center"
              />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group]} />
          </GridComponent>
          {/* 
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Date</th>
                <th width="20%">Category</th>
                <th width="10%">Amount</th>
                <th>Description</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>{expenseList}</tbody>
          </Table> */}
        </Container>
      </div>
    );
  }
}

export default ExpenseList;

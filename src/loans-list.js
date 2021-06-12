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

class LoanList extends Component {
  constructor(props) {
    super(props);
    this.state = { loans: [], isLoading: true };
    this.remove = this.remove.bind(this);
    this.template = this.gridTemplate;
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://localhost:5000/api/Loan")
      .then((response) => response.json())
      .then((data) => this.setState({ loans: data.result, isLoading: false }));
  }

  async remove(id) {
    await fetch(`http://localhost:5000/api/Loan/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedLoans = [...this.state.loans].filter((i) => i.id !== id);
      this.setState({ loans: updatedLoans });
    });
  }

  gridTemplate(props) {
    return (
      <div className="image">
        <Button size="sm" color="primary" tag={Link} to={"/loans/" + props.id}>
          Details
        </Button>
      </div>
    );
  }

  render() {
    const { loans, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/loans/new">
              Add Loan
            </Button>
          </div>
          <h3>Loan List</h3>
          <GridComponent dataSource={loans}>
            <ColumnsDirective>
              <ColumnDirective
                headerText="Loan #"
                field="loanNumber"
                width="50"
              />
              <ColumnDirective
                headerText="Loan Date"
                field="loanDate"
                width="100"
                type="datetime"
                format="dd/MM/yyyy"
              />

              <ColumnDirective
                headerText="Customer"
                field="loanNumber"
                width="50"
              />

              <ColumnDirective
                headerText="Loan Amount"
                field="principalAmount"
                width="50"
                format="n2"
                textAlign="Right"
              />
              <ColumnDirective
                headerText="Total Paid"
                field="totalPaidAmount"
                width="50"
                format="n2"
                textAlign="Right"
              />
              <ColumnDirective
                headerText="Balance"
                field="balanceAmount"
                width="50"
                format="n2"
                textAlign="Right"
              />
              <ColumnDirective headerText="Notes" field="notes" width="100" />
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
        </Container>
      </div>
    );
  }
}

export default LoanList;

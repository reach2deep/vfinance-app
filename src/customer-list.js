import { Button, ButtonGroup, Container, Table } from "reactstrap";
import {
  ColumnDirective,
  ColumnsDirective,
  CommandClickEventArgs,
  CommandColumn,
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
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { Link } from "react-router-dom";

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = { customers: [], isLoading: true };
    this.remove = this.remove.bind(this);
    this.template = this.gridTemplate;
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://localhost:5000/api/Customer")
      .then((response) => response.json())
      .then((data) =>
        this.setState({ customers: data.result, isLoading: false })
      );
  }

  async remove(id) {
    await fetch(`http://localhost:5000/api/Customer/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedCustomers = [...this.state.customers].filter(
        (i) => i.id !== id
      );
      this.setState({ customers: updatedCustomers });
    });
  }
  gridTemplate(props) {
    return (
      <div className="image">
        <Button
          size="sm"
          color="primary"
          tag={Link}
          to={"/customers/" + props.id}
        >
          Edit
        </Button>
      </div>
    );
  }

  render() {
    const { customers, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/customers/new">
              Add Customer
            </Button>
          </div>
          <h3>Customer List</h3>

          <GridComponent dataSource={customers}>
            <ColumnsDirective>
              <ColumnDirective
                headerText="Name"
                field="displayName"
                width="50"
                format="yMd"
              />
              <ColumnDirective
                field="businessName"
                headerText="Business"
                width="100"
              />
              <ColumnDirective
                headerText="Mobile"
                field="mobile1"
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
            <tbody>{customerList}</tbody>
          </Table> */}
        </Container>
      </div>
    );
  }
}

export default CustomerList;

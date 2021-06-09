import * as data from "./ref-data.json";

import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import {
  ChangeEventArgs,
  DropDownListComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { Link, withRouter } from "react-router-dom";
import {
  NumericTextBoxComponent,
  TextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import React, { Component } from "react";
import { setCulture, setCurrencyCode } from "@syncfusion/ej2-base";

import AppNavbar from "./AppNavbar";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

class ExpenseDetail extends Component {
  newExpense = {
    id: 0,
    expenseDate: "",
    category: "",
    amount: 0,
    description: "",
    creationAt: "",
    createdBy: "",
    isActive: true,
  };

  categoryData: { [key: string]: Object }[] = data["categoryData"];
  // map the groupBy field with Category column
  groupFields: Object = { groupBy: "Group", text: "Category", value: "Id" };

  constructor(props) {
    super(props);
    this.state = {
      item: this.newExpense,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log(this.categoryData);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const expense = await (
        await fetch(
          `http://localhost:5000/api/Expense/${this.props.match.params.id}`
        )
      ).json();
      // console.log(JSON.stringify(expense));
      this.setState({ item: expense.result });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });

    // item[name] = value;
    item[name] =
      event.target.type == "number"
        ? parseInt(event.target.value, 10)
        : event.target.value;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    await fetch(`http://localhost:5000/api/Expense`, {
      method: item.id !== 0 ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/expenses");
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? "Edit Expense" : "Add Expense"}</h2>;
    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              {/* <Label for="expenseDate">Date</Label> */}
              {/* <Input
                type="text"
                name="expenseDate"
                id="expenseDate"
                value={item.expenseDate || ""}
                onChange={this.handleChange}
                autoComplete="expenseDate"
              /> */}
              <DateTimePickerComponent
                type="text"
                name="expenseDate"
                id="expenseDate"
                value={item.expenseDate || ""}
                onChange={this.handleChange}
                floatLabelType="Auto"
                cssClass="e-outline"
                placeholder="Select a date and time"
              />
            </FormGroup>
            <FormGroup>
              {/* <Label for="category">Category</Label> */}
              {/* <Input
                type="text"
                name="category"
                id="category"
                value={item.category || ""}
                onChange={this.handleChange}
                autoComplete="category"
              /> */}

              <DropDownListComponent
                name="category"
                id="category"
                dataSource={this.categoryData}
                fields={this.groupFields}
                floatLabelType="Auto"
                placeholder="Select a Category"
                placeholder="Category"
                cssClass="e-outline"
              />
              {/* <TextBoxComponent
                type="text"
                name="category"
                id="category"
                value={item.category || ""}
                onChange={this.handleChange}
                placeholder="Category"
                cssClass="e-outline"
                floatLabelType="Auto"
              /> */}
            </FormGroup>
            <FormGroup>
              {/* <Label for="amount">Amount</Label> */}
              {/* <Input
                type="number"
                name="amount"
                id="amount"
                value={item.amount || null}
                onChange={this.handleChange}
                autoComplete="amount"
              /> */}
              <NumericTextBoxComponent
                name="amount"
                id="amount"
                value={item.amount || null}
                onChange={this.handleChange}
                format="n2"
                floatLabelType="Auto"
                placeholder="Amount"
                cssClass="e-outline"
              ></NumericTextBoxComponent>
            </FormGroup>
            <FormGroup>
              {/* <Label for="description">Description</Label> */}
              {/* <Input
                type="text"
                name="description"
                id="description"
                value={item.description || ""}
                onChange={this.handleChange}
                autoComplete="description"
              /> */}
              <TextBoxComponent
                type="text"
                name="description"
                id="description"
                value={item.description || ""}
                onChange={this.handleChange}
                multiline={true}
                floatLabelType="Auto"
                cssClass="e-outline"
                placeholder="Description"
                ref={(scope) => {
                  this.textareaObj = scope;
                }}
              ></TextBoxComponent>
            </FormGroup>
            <FormGroup>
              <ButtonComponent
                cssClass="e-primary"
                color="primary"
                type="submit"
              >
                Save
              </ButtonComponent>{" "}
              <ButtonComponent tag={Link} to="/expenses">
                Cancel
              </ButtonComponent>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(ExpenseDetail);

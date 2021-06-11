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
import { Query } from "@syncfusion/ej2-data";

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

  categoryObj: any;
  categoryData: { [key: string]: Object }[] = data["categoryData"];
  // map the groupBy field with Category column
  groupFields: Object = { groupBy: "Group", text: "Category", value: "Id" };

  categoryList: string[] = data["categoryList"];

  constructor(props) {
    super(props);
    this.state = {
      item: this.newExpense,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
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

    console.log(event.target.value);

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

    const api =
      "http://localhost:5000/api/Expense" +
      (item.id !== 0 ? "/" + item.id : "");

    console.log(api);
    console.log(JSON.stringify(item));
    await fetch(api, {
      method: item.id || item.id !== 0 ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/expenses");
  }

  onCategoryChange(params) {
    // query the data source based on state DropDownList selected value
    console.log("onCategoryChange" + JSON.stringify(params.itemData.text));

    // let selcat = this.categoryData.Query.Where("Id", "equal", this.Category);
    // console.log(this.item.category);
    // this.categoryObj = new Query().where("Id", "equal", this.categoryData);
    // console.log(
    //   (this.props.dataSource = new Query().where(
    //     "Id",
    //     "equal",
    //     this.categoryData.Category
    //   ))
    // );

    let item = { ...this.state.item };
    console.log(JSON.stringify(item));
    console.log(JSON.stringify(item["category"]));

    item["category"] = params.itemData.text;
    this.setState({ item });
    item["category"] = params.itemData.text;
    console.log(JSON.stringify(item));

    // console.log(this.categoryObj);
  }

  handleCategoryChange = (event) => {
    console.log(event.target.value);
    this.setState({
      value: event.target.value,
    });
  };

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
                dataSource={this.categoryList}
                placeholder="Category"
                value={item.category}
                text={item.category}
                change={this.onCategoryChange}
                cssClass="e-outline"
                floatLabelType="Auto"
              />
              {/* <DropDownListComponent
                name="category"
                id="category"
                dataSource={this.categoryData}
                fields={this.groupFields}
                floatLabelType="Auto"
                placeholder="Select a Category"
                placeholder="Category"
                cssClass="e-outline"
                value={item.category || ""}
                text={item.category || ""}
                change={this.onCategoryChange}
              /> */}
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

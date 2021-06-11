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

class CustomerDetail extends Component {
  newCustomer = {
    id: 0,
    displayName: "",
    firstName: "",
    lastName: "",
    notes: "",
    address: "",
    mobile1: "",
    mobile2: "",
    businessName: "",
    businessAddress: "",
    businessMobile1: "",
    businessMobile2: "",
    isActive: true,
  };

  categoryData: { [key: string]: Object }[] = data["categoryData"];
  // map the groupBy field with Category column
  groupFields: Object = { groupBy: "Group", text: "Category", value: "Id" };

  constructor(props) {
    super(props);
    this.state = {
      item: this.newCustomer,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log(this.categoryData);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const customer = await (
        await fetch(
          `http://localhost:5000/api/Customer/${this.props.match.params.id}`
        )
      ).json();
      // console.log(JSON.stringify(customer));
      this.setState({ item: customer.result });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });

    item[name] = value.toString();
    // item[name] =
    //   event.target.type == "number"
    //     ? event.target.value
    //     : event.target.value;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    const api =
      "http://localhost:5000/api/Customer" +
      (item.id !== 0 ? "/" + item.id : "");

    console.log(api);
    await fetch(api, {
      method: item.id || item.id !== 0 ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/customers");
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? "Edit Customer" : "Add Customer"}</h2>;
    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <TextBoxComponent
                type="text"
                name="displayName"
                id="displayName"
                value={item.displayName || ""}
                onChange={this.handleChange}
                floatLabelType="Auto"
                cssClass="e-outline"
                placeholder="Display Name"
              />
            </FormGroup>
            <FormGroup>
              <TextBoxComponent
                type="text"
                name="firstName"
                id="firstName"
                value={item.firstName || ""}
                onChange={this.handleChange}
                floatLabelType="Auto"
                cssClass="e-outline"
                placeholder="First Name"
              />
            </FormGroup>
            <FormGroup>
              <TextBoxComponent
                type="text"
                name="lastName"
                id="lastName"
                value={item.lastName || ""}
                onChange={this.handleChange}
                floatLabelType="Auto"
                cssClass="e-outline"
                placeholder="Last Name"
              />
            </FormGroup>

            <FormGroup>
              <TextBoxComponent
                type="text"
                name="address"
                id="address"
                value={item.notes || ""}
                onChange={this.handleChange}
                multiline={true}
                floatLabelType="Auto"
                cssClass="e-outline"
                placeholder="Address"
                ref={(scope) => {
                  this.textareaObj = scope;
                }}
              ></TextBoxComponent>
            </FormGroup>

            <FormGroup>
              <NumericTextBoxComponent
                name="mobile1"
                id="mobile1"
                value={item.mobile1 || null}
                onChange={this.handleChange}
                format="n2"
                floatLabelType="Auto"
                placeholder="Mobile 1"
                cssClass="e-outline"
              ></NumericTextBoxComponent>
            </FormGroup>

            <FormGroup>
              <NumericTextBoxComponent
                name="mobile2"
                id="mobile2"
                value={item.mobile2 || null}
                onChange={this.handleChange}
                format="n2"
                floatLabelType="Auto"
                placeholder="Mobile 2"
                cssClass="e-outline"
              ></NumericTextBoxComponent>
            </FormGroup>

            <FormGroup>
              <TextBoxComponent
                type="text"
                name="businessName"
                id="businessName"
                value={item.businessName || ""}
                onChange={this.handleChange}
                floatLabelType="Auto"
                cssClass="e-outline"
                placeholder="Business Name"
              />
            </FormGroup>

            <FormGroup>
              <TextBoxComponent
                type="text"
                name="businessAddress"
                id="businessAddress"
                value={item.notes || ""}
                onChange={this.handleChange}
                multiline={true}
                floatLabelType="Auto"
                cssClass="e-outline"
                placeholder="Business Address"
                ref={(scope) => {
                  this.textareaObj = scope;
                }}
              ></TextBoxComponent>
            </FormGroup>

            <FormGroup>
              <NumericTextBoxComponent
                name="businessMobile1"
                id="businessMobile1"
                value={item.businessMobile1 || null}
                onChange={this.handleChange}
                format="n2"
                floatLabelType="Auto"
                placeholder="Business Mobile 1"
                cssClass="e-outline"
              ></NumericTextBoxComponent>
            </FormGroup>

            <FormGroup>
              <NumericTextBoxComponent
                name="businessMobile2"
                id="businessMobile2"
                value={item.businessMobile2 || null}
                onChange={this.handleChange}
                format="n2"
                floatLabelType="Auto"
                placeholder="Business Mobile 2"
                cssClass="e-outline"
              ></NumericTextBoxComponent>
            </FormGroup>

            <FormGroup>
              <TextBoxComponent
                type="text"
                name="notes"
                id="notes"
                value={item.notes || ""}
                onChange={this.handleChange}
                multiline={true}
                floatLabelType="Auto"
                cssClass="e-outline"
                placeholder="Notes"
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
              <ButtonComponent tag={Link} to="/customers">
                Cancel
              </ButtonComponent>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(CustomerDetail);

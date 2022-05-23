import React, { Component } from "react";
import Form from "react-validation/build/form";
import Select from "react-validation/build/select";
import ItemOption from "../item/ItemOption";

import itemapi from "../api/itemapi";
import {
  MDBBtn,
  MDBInput,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import InvoiceItem from "./InvoiceItem";
import invoiceapi from "../api/invoiceapi";
import ErrorAlert from "../common/alerts";

class InvoiceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allItems: [],

      customerName: "",
      total: 0,
      date: new Date(),

      invoiceItems: [],
      item: {
        id: -1,
        quantity: 0,
        subTotal: 0,
      },
      errorMessage: undefined
    };
  }

  componentDidMount() {
    this.getAllItems();
  }

  getAllItems() {
    itemapi
      .getAllItem()
      .then((response) => {
        this.setState({
          allItems: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: "Errors",
        });
      });
  }

  customerNameChangeHandler = (event) => {
    this.setState({
      customerName: event.target.value,
    });
  };

  itemChangeHandler = (event) => {
    const id = event.target.value;
    itemapi.getItem(id).then((response) => {
      this.setState({
        item: response.data,
      });
    });
  };

  quantityChangeHandler = (event) => {
    this.setState({
      item: {
        ...this.state.item,
        quantity: event.target.value,
        subTotal: event.target.value * this.state.item.price,
      },
    });
  };

  addItem = (event) => {
    event.preventDefault();
    const newItem = this.state.item;
    if(newItem.quantity <= 0){
     this.setState({
       errorMessage: "Please enter quantity"
     })
      return;
    }
    if (!this.state.invoiceItems.some((item) => newItem.id === item.id)) {
      this.setState((prevState) => ({
        invoiceItems: [prevState.item, ...prevState.invoiceItems],
        total: prevState.total + prevState.item.subTotal,
      }));
    } else {
      alert("item is already in the invoice");
    }
  };

  saveInvoice = (event) => {
    const { customerName, invoiceItems, total } = this.state;
    let date = new Date();
    let formateDate = date.toISOString().split("T")[0];
    event.preventDefault();
    const newInvoice = {
      customerName: customerName,
      items: invoiceItems,
      total: total,
      date: formateDate,
    };

    invoiceapi
      .addInvoice(newInvoice)
      .then((response) => {
        this.props.history.push("/invoice");
      })
      .catch((error) => {
        alert("error while saving invoice");
      });
  };

  render() {
    const { allItems, invoiceItems, errorMessage } = this.state;
    let itemList, invoiceItemList;
    if (allItems.length > 0) {
      itemList = allItems.map((item) => (
        <ItemOption key={item.id} item={item} />
      ));
    }
    if (invoiceItems.length > 0) {
      invoiceItemList = invoiceItems.map((item) => (
        <InvoiceItem key={item.id} item={item} />
      ));
    }
    return (
      <div className="col-md-6 align-center">
        {errorMessage&& <ErrorAlert errorMessage={errorMessage} />}
        <h2>New Invoice</h2>
        <Form>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              className="form-control"
              type="text"
              value={this.state.customerName}
              onChange={this.customerNameChangeHandler}
              MDBInput
            ></input>
          </div>

          <MDBTable>
            <MDBTableBody>
              <tr>
                <td colSpan="5">
                  <div className="form-group">
                    <Select
                      className="form-control"
                      name="item"
                      value={this.state.item.id}
                      onChange={this.itemChangeHandler}
                    >
                      {itemList}
                    </Select>
                  </div>
                </td>
                <td>
                  <MDBInput
                    onChange={this.quantityChangeHandler}
                    value={this.state.item.quantity}
                    name="quantity"
                    size="XL"
                    type="number"
                  />
                </td>
                <td colSpan="3">
                  <MDBBtn size="XL" onClick={this.addItem}>
                    Add
                  </MDBBtn>
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </Form>
        <div>
          <MDBTable striped size="100x">
            <MDBTableHead className="thead-dark">
              <tr>
                <th scope="col">Iten name</th>
                <th scope="col">Category</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Sub-total</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {invoiceItemList}
              <tr className="thead-dark">
                <td className="bold" colSpan="4">Total</td>
                <td>{this.state.total}</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
        <div>
          <MDBBtn size="xl" onClick={this.saveInvoice}>
            Save
          </MDBBtn>
        </div>
      </div>
    );
  }
}

export default InvoiceForm;

import React, { Component } from "react";
import invoiceapi from "../api/invoiceapi";
import Invoice from "./Invoice";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
export class InvoiceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [],
      errorMessage: undefined,
    };
  }

  componentDidMount() {
    this.getAllInvoices();
  }

  getAllInvoices() {
    invoiceapi
      .getAllInvoice()
      .then((response) => {
        this.setState({
          invoices: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: "Error while retriving invoices!",
        });
      });
  }

  render() {
    const { invoices } = this.state;
    let invoiceList;
    if (invoices.length > 0) {
      invoiceList = invoices.map((invoice) => (
        <Invoice key={invoice.id} invoice={invoice} />
      ));
    }

    return (
      <div className="col-md-11">
        <Link to={"/new-invoice"}>
          <MDBIcon icon="plus-square" size="3x" />
        </Link>
        <div>
          <h2>Invoices</h2>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>{invoiceList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default InvoiceList;

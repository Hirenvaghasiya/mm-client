import React from "react";
import { Link } from "react-router-dom";

function Invoice({ invoice }) {
  var dateTime = new Date(invoice.date);
  return (
    <tr>
      <th scope="row">{invoice.id}</th>
      <td>{invoice.customerName}</td>
      <td>{dateTime.toDateString()}</td>
      <td>{invoice.total}</td>
      <td>
        <Link to={`/invoice/edit/${invoice.id}`}>
          <i class="bi bi-pencil-fill" />
        </Link>
      </td>
    </tr>
  );
}

export default Invoice;

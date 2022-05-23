import React from 'react'

function InvoiceItem({item}) {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.category.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.subTotal}</td>
        </tr>
    )
}

export default InvoiceItem
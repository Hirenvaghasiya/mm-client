import React, { Component } from "react";
import { Link } from "react-router-dom";

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
    this.toggleModal.bind(this);
  }

  toggleModal = (item) => {
    this.props.setParentState(item);
  };

  deleteItem = (itemId) => {
    this.props.deleteItem(itemId);
  };

  render() {
    const { item } = this.props;
    return (
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.category.name}</td>
        <td>{item.price}</td>
        <td>
          <Link to={`/item/edit/${item.id}`}>
            <i class="bi bi-pencil-fill" />
          </Link>
        </td>
        <td>
          <button onClick={() => this.deleteItem(item.id)}>
            <i class="bi bi-trash-fill" />
          </button>
        </td>
      </tr>
    );
  }
}

export default Item;

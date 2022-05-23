import React, { Component } from "react";
import { Link } from "react-router-dom";
import itemapi from "../api/itemapi";
import ErrorAlert from "../common/alerts";
import Item from "./Item";

export class ItemList extends Component {
  constructor(props) {
    super(props);
    this.setParentState.bind(this);
    this.state = {
      items: [],
      showModal: false,
      errorMessage: undefined,
      item: {},
    };
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  getAllItems() {
    itemapi
      .getAllItem()
      .then((response) => {
        this.setState({
          items: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: "Error while retriving data",
        });
      });
  }

  componentDidMount() {
    this.getAllItems();
  }

  setParentState = (item) => {
    this.setState({
      showModal: true,
      item: item,
    });
  };

  deleteItem = (itemId) => {
    itemapi
      .deleteItem(itemId)
      .then((response) => {
        const deletedId = response.data.id;
        this.setState({
          items: this.state.items.filter((item) => item.id !== deletedId),
        });
      })
      .catch((erorr) => {
        <ErrorAlert errorMessage="Error while deleting item" />;
      });
  };

  render() {
    const { items, item } = this.state;
    let itemList;
    if (items.length > 0) {
      itemList = items.map((item) => (
        <Item
          key={item.id}
          item={item}
          id={item.id}
          setParentState={this.setParentState}
          deleteItem={this.deleteItem}
        />
      ));
    }
    return (
      <div className="col-md-11">
        <Link to={"/item/add"}>
          <i className="bi-file-plus-fill fs-1"></i>
        </Link>
        <div>
          <h2>Items</h2>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col" colSpan="2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{itemList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ItemList;

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import categoryapi from "../api/categoryapi";
import CategoryOption from "./CategoryOption";
import Modal from "react-modal";

import "../../App.css";
import itemapi from "../api/itemapi";
import ErrorAlert from "../common/alerts";
Modal.setAppElement("#root");
export class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      categories: [],
      errorMsg: "",
    };

    this.submitItem = this.submitItem.bind();
  }

  componentDidMount() {
    categoryapi
      .getAllCategory()
      .then((response) => {
        this.setState({
          categories: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          errorMsg: "Error while retriving categories",
        });
      });
  }

  itemnameChangeHandler = (event) => {
    this.setState({
      item: {
        ...this.state.item,
        name: event.target.value,
      },
    });
  };

  categoryChangeHandler = (event) => {
    this.setState({
      item: {
        ...this.state.item,
        category: {
          id: event.target.value,
        },
      },
    });
  };

  priceChangeHandler = (event) => {
    this.setState({
      item: {
        ...this.state.item,
        price: event.target.value,
      },
    });
  };

  submitItem = (event) => {
    event.preventDefault();
    const { item } = this.state;
    if (item.id) {
      itemapi
        .editItem(item.id, item)
        .then((response) => {
          this.props.items.push(response.data);
          this.props.history.push("/items");
        })
        .catch((error) => {
          <ErrorAlert errorMessage={error} />;
        });
    } else {
      itemapi
        .addItem(this.state.item)
        .then((response) => {
          this.props.toggle();
          this.props.items.push(response.data);
          this.props.history.push("/items");
        })
        .catch((error) => {
          <ErrorAlert errorMessage={error} />;
        });
    }
  };

  render() {
    let { categories, item } = this.state;

    if (!item.id) {
      item = {
        name: "",
        category: {
          id: -1,
        },
        price: 0,
      };
    }

    let categoryList;
    if (categories.length > 0) {
      categoryList = categories.map((cat) => (
        <CategoryOption key={cat.id} category={cat} />
      ));
    }
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.toggle}
        fade={false}
        style={{ width: "200px", display: "block" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Item</h5>
              <button
                onClick={this.props.toggle}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Form onSubmit={this.submitItem}>
                <div className="form-group">
                  <label htmlFor="name">Item Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={item.name}
                    onChange={this.itemnameChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <Select
                    className="form-control"
                    name="category"
                    value={item.category.id}
                    onChange={this.categoryChangeHandler}
                  >
                    {categoryList}
                  </Select>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="price"
                    value={item.price}
                    onChange={this.priceChangeHandler}
                  />
                </div>
                {/* <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Add Item</span>
              </button>
            </div> */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={this.props.toggle}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </Form>
              {this.state.errorMsg}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ItemForm;

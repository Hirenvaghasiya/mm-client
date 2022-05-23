import React, { Component } from 'react';
import ItemForm1 from './ItemForm1';

class AddItem extends Component {
  render() {
    return <ItemForm1 history={this.props.history} />;
  }
}

export default AddItem;

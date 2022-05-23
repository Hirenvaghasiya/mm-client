import React, { Component } from 'react';
import ItemForm1 from './ItemForm1';

class EditItem extends Component {

  render() {
    return <ItemForm1 itemId={this.props.match.params.id} history={this.props.history} />;
  }
}

export default EditItem;

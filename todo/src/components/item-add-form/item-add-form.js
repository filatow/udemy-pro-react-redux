import React, {Component} from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {
  constructor() {
    super();

    this.state = {
      label: '',
    };

    this.onLabelChange = (event) => {
      this.setState({
        label: event.target.value
      })
    };

    this.onSubmit = (event) => {
      event.preventDefault();
      this.props.onItemAdded(this.state.label);
      this.setState({
        label: ''
      })
    }
  }

  render() {
    return (
      <form className='item-add-form d-flex'
            onSubmit={this.onSubmit}>
        <input  type='text'
                className='form-control'
                onChange={this.onLabelChange}
                placeholder='What need to be done?'
                value={this.state.label}/>
        <button type='submit'
                className='btn btn-outline-secondary'
                >
            Add Item
        </button>
      </form>
    );
  }
}
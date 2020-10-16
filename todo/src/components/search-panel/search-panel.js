import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
  constructor() {
    super();

    this.state = {
      searchRequest: ''
    };

    this.onSearchChange = (event) => {
      const term = event.target.value;
      this.setState({searchRequest: term});
      this.props.onSearchChange(term);
    };
  }

  render() {
    return (
      <input  type="text"
              className="form-control search-input"
              placeholder="type to search"
              value={this.state.searchRequest}
              onChange={this.onSearchChange} />
              // onChange={(event) => {onSearch(event.target.value)}} />
    );
  }
};

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Title extends Component{
  static propTypes = {
    label: PropTypes.string,
    style: PropTypes.object,
  }

  render = () => {
    return (
      <div style={this.props.style} className="main-title">
        {this.props.label}
      </div>);
  }
}

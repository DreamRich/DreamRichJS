import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Subtitle extends Component{
  static propTypes = {
    label: PropTypes.string,
    style: PropTypes.object,
  }

  render = () => {
    return (
      <div style={this.props.style} className="subtitle">
        {this.props.label}
      </div>
    );
  }
}

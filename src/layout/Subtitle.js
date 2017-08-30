import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Subtitle extends Component{
  render(){
    return (
    <div className="container">
    <div style={this.props.style} className="subtitle">{this.props.label}</div>
    </div>);
  }
}
Subtitle.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object,
};

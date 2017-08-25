import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Title extends Component{
  render(){
    return (<div className="main-title" style={this.props.style}>{this.props.label}</div>);
  }
}
Title.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object
};

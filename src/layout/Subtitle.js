import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Subtitle extends Component{
  render(){
    return (<div className="subtitle">{this.props.label}</div>);
  }
}
Subtitle.propTypes = {
  label: PropTypes.string
};

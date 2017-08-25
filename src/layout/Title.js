import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Title extends Component{
  render(){
    return (<div className="main-title">{this.props.title}</div>);
  }
}
Title.propTypes = {
  title: PropTypes.string
};

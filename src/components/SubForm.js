import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import PropTypes from 'prop-types';
import {routeMap} from '../routes/RouteMap';
import Formsy from 'formsy-react';

export default class SubForm extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    title: PropTypes.string,
    parent_id: PropTypes.number,
    parent_name: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.element,
    action: PropTypes.string,
    canSubmit: PropTypes.bool,
    index: PropTypes.number,
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.canSubmit &&
        this.props.canSubmit) {
      this.form.submit();
    }
  }

  componentDidMount = () => {
    console.log(this.form);
  }

  submitForm = (data) => {
    if (this.props.parent_name) {
      data[this.props.parent_name] = this.props.parent_id;
    }
    AppDispatcher.dispatch(
      {
        action: this.props.action,
        route: routeMap[this.props.name],
        data: data,
        state: this.props.name,
        index: this.props.index,
      });
  }

  render = () => {
    return (
      <Formsy.Form
        ref={(ref) => {this.form = ref; }}
        onValidSubmit={this.submitForm}>
        {this.props.children}
      </Formsy.Form>
    );
  }
}


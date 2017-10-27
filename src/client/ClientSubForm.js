import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import PropTypes from 'prop-types';
import {routeMap} from '../routes/RouteMap';
import Formsy from 'formsy-react';

export default class ClientSubForm extends Component {
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
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.canSubmit &&
        this.props.canSubmit) {
      this.form.submit();
    }
  }

  submitForm = (data) => {
    if (this.props.parent_name) {
      data[this.props.parent_name] = this.props.parent_id;
    }
    AppDispatcher.dispatch(
      {
        action: this.props.action,
        data: data,
        route: routeMap[this.props.name],
        state: this.props.name,
      });
  }

  render = () => {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Formsy.Form
          ref={(ref) => {this.form = ref; }}
          onValidSubmit={this.submitForm}>
          {this.props.children}
        </Formsy.Form>
      </div>
    );
  }
}


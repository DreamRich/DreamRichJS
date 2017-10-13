import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import PropTypes from 'prop-types';
import {routeMap} from '../routes/RouteMap';
import Formsy from 'formsy-react';

export default class ClientSubForm extends Component {
  constructor(props){
    super(props);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.parent_id === undefined &&
        this.props.parent_id !== undefined) {
      console.log(prevProps, 'previous');
      console.log(this.props, 'next');
      setTimeout(this.form.submit, 200);
    }
  }

  submitForm = (data) => {
    data[this.props.parent_name] = this.props.parent_id;
    AppDispatcher.dispatch(
      {
        actionType: ActionType.CLIENT.SUBFORM,
        data: data,
        route: routeMap[this.props.name]
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

ClientSubForm.propTypes = {
  title: PropTypes.string,
  parent_id: PropTypes.number,
  parent_name: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.element,
};

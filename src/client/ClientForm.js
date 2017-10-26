import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import PropTypes from 'prop-types';
//import routeMap from '../routes/RouteMap';
import Formsy from 'formsy-react';

export default class ClientForm extends Component {
  constructor(props){
    super(props);
  }
  static propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.element,
  }

  submitForm = (data) => {
    AppDispatcher.dispatch({
      action: ActionType.CLIENT.ACTIVE,
      data: data
    });
  }

  submit = () => {this.form.submit();}

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

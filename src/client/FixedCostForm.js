import React, {Component} from 'react';
//import AppDispatcher from '../AppDispatcher';
//import ActionType from '../actions/ActionType';
import PropTypes from 'prop-types';
//import routeMap from '../routes/RouteMap';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import errorMessages from '../utils/FormsErrorMessages';

var {
  numericError,
} = errorMessages;
export default class ClientForm extends Component {
  constructor(props){
    super(props);
  }

  submitForm = (data) => {
    console.log(data);
  }

  submit= () => {console.log(this.form); this.form.submit();}

  render = () => {
    return (
      <div>
        <Formsy.Form
          ref={(ref) => this.form = ref}
          name="fixed_cos"
        >
          <FormsyText
            name="type_cost"
            hintText="Tipo do custo"
            floatingLabelText="Tipo"
          />
          <FormsyText
            name="value"
            validations="isNumeric"
            validationError={numericError}
            hintText="000.00"
            floatingLabelText="Valor"
          />
        </Formsy.Form>
      </div>
    );
  }
}

ClientForm.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.element,
};

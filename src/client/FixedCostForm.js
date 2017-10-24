import React, {Component} from 'react';
//import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import PropTypes from 'prop-types';
//import routeMap from '../routes/RouteMap';
//import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import errorMessages from '../utils/FormsErrorMessages';
import ClientSubForm from './ClientSubForm';
import MenuItem from 'material-ui/MenuItem';
import {FormsySelect} from 'formsy-material-ui/lib';

var {
  numericError,
} = errorMessages;
export default class FixedCostForm extends Component {

  constructor(props){
    super(props);
  }

  getOptions = () => {
    return this.props.types.map( (type) => 
      <MenuItem key={type.id} value={type.id} primaryText={type.name} /> 
    );
  }

  render = () => {
    return (
      <div>
        <ClientSubForm
          name="regular_cost"
          action={ActionType.FIXEDCOST.SUBFORM}
          parent_id={this.props.id}
          parent_name='cost_manager_id'
          title="cost"
        >
          <div>
            <FormsySelect
              name="cost_type_id"
              floatingLabelText="Tipo"
              maxHeight={300}
            >
              {this.getOptions()}
            </FormsySelect>
            <FormsyText
              name="value"
              validations="isNumeric"
              validationError={numericError}
              hintText="000.00"
              floatingLabelText="Valor"
            />
          </div>
        </ClientSubForm>
      </div>
    );
  }
}

FixedCostForm.propTypes = {
  id: PropTypes.number,
  types: PropTypes.array,
};

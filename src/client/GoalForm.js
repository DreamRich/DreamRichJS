import React, {Component} from 'react';
//import AppDispatcher from '../AppDispatcher';
//import ActionType from '../actions/ActionType';
import PropTypes from 'prop-types';
//import routeMap from '../routes/RouteMap';
//import Formsy from 'formsy-react';
import {FormsySelect, FormsyText , FormsyCheckbox, FormsyDate} from 'formsy-material-ui/lib';
import errorMessages from '../utils/FormsErrorMessages';
import ClientSubForm from './ClientSubForm';
import MenuItem from 'material-ui/MenuItem';

var {
  numericError,
} = errorMessages;
export default class GoalForm extends Component {

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
            <FormsyCheckbox
              name='has_end_date'
              floatingLabelText='Tem fim?'
            />
            <div>
              <FormsyDate
                name='year_end'
                floatingLabelText='Ano de início do objetivo'
                openToYearSelection={true}
                autoOk={true}
                formatDate={(date)=>date.getUTCFullYear()}
              />
              <FormsyDate
                name='year_end'
                floatingLabelText='Ano de fim do objetivo'
                openToYearSelection={true}
                autoOk={true}
                formatDate={(date)=>date.getUTCFullYear()}
              />
            </div>
            <FormsyText
              name="periodicity"
              validations="isNumeric"
              validationError={numericError}
              hintText="0"
              floatingLabelText="Valor"
            />
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

GoalForm.propTypes = {
  id: PropTypes.number,
  types: PropTypes.array,
};

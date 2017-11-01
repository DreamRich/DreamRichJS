import React, {Component} from 'react';
//import AppDispatcher from '../AppDispatcher';
import ActionType from '../../actions/ActionType';
import PropTypes from 'prop-types';
//import routeMap from '../routes/RouteMap';
//import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import errorMessages from '../../utils/FormsErrorMessages';
import SubForm from '../../components/SubForm';
import MenuItem from 'material-ui/MenuItem';
import {FormsySelect} from 'formsy-material-ui/lib';

var {
  numericError,
} = errorMessages;
export default class RegularCostForm extends Component {

  constructor(props){
    super(props);
  }

  static propTypes = {
    id: PropTypes.number,
    index: PropTypes.number,
    types: PropTypes.array,
    canSubmit: PropTypes.bool,
    data: PropTypes.object,
  }

  getOptions = () => {
    return this.props.types.map( (type) =>
      <MenuItem key={type.id} value={type.id} primaryText={type.name} /> 
    );
  }

  render = () => {
    const cost_type = this.props.data.cost_type || {};
    return (
      <div>
        <SubForm
          name="regular_cost"
          action={ActionType.REGULARCOST.SUBFORM}
          parent_id={this.props.id}
          parent_name='cost_manager_id'
          title="cost"
          index={this.props.index}
          canSubmit={this.props.canSubmit}
        >
          <div>
            <FormsySelect
              name="cost_type_id"
              floatingLabelText="Tipo"
              maxHeight={300}
              value={cost_type.id}
            >
              {this.getOptions()}
            </FormsySelect>
            <FormsyText
              name="value"
              validations="isNumeric"
              validationError={numericError}
              hintText="000.00"
              floatingLabelText="Valor"
              value={this.props.data.value}
            />
          </div>
        </SubForm>
      </div>
    );
  }
}



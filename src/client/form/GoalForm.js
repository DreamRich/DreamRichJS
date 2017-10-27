import React, {Component} from 'react';
import AppDispatcher from '../../AppDispatcher';
import ActionType from '../../actions/ActionType';
import PropTypes from 'prop-types';
//import routeMap from '../routes/RouteMap';
//import Formsy from 'formsy-react';
import {FormsySelect, FormsyText , FormsyToggle/*, FormsyDate*/} from 'formsy-material-ui/lib';
import errorMessages from '../../utils/FormsErrorMessages';
import SubForm from '../../components/SubForm';
import MenuItem from 'material-ui/MenuItem';

var {
  numericError,
} = errorMessages;

export default class GoalForm extends Component {

  constructor(props){
    super(props);
  }

  static propTypes = {
    id: PropTypes.number,
    types: PropTypes.array,
    hasEndDate: PropTypes.bool,
  }

  getOptions = () => {
    return this.props.types.map( (type) =>
      <MenuItem key={type.id} value={type.id} primaryText={type.name} />
    );
  }

  onChangeHasEnd = (event, value) => {
    AppDispatcher.dispatch({
      action: ActionType.GOAL.HASEND,
      hasEnd: value
    });
  }

  render = () => {
    return (
      <div>
        <SubForm
          name="goal"
          action={ActionType.GOAL.SUBFORM}
          parent_id={this.props.id}
          parent_name='goal_manager_id'
          title="Goal"
        >
          <div>
            <FormsySelect
              name="goal_type_id"
              floatingLabelText="Tipo"
              maxHeight={300}
            >
              {this.getOptions()}
            </FormsySelect>
            <FormsyToggle
              name='has_end_date'
              label='Tem fim?'
              labelPosition='left'
              onChange={this.onChangeHasEnd}
            />
            <div>
              <FormsyText
                name='year_init'
                floatingLabelText='Ano de início do objetivo'
                validations="isNumeric"
                validationError={numericError}
              />
              {this.props.hasEndDate && <FormsyText
                name='year_end'
                floatingLabelText='Ano de fim do objetivo'
                validations="isNumeric"
                validationError={numericError}
              /> }
            </div>
            <FormsyText
              name="periodicity"
              validations="isNumeric"
              validationError={numericError}
              hintText="Em anos. Ex: 10"
              floatingLabelText="Periodicidade"
            />
            <FormsyText
              name="value"
              validations="isNumeric"
              validationError={numericError}
              hintText="Valor em R$. Ex.: 000.00"
              floatingLabelText="Valor"
            />
          </div>
        </SubForm>
      </div>
    );
  }
}


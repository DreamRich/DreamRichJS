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
import CardForm from '../../components/CardForm';
import { Row, Col } from 'react-flexbox-grid';

var {
  numericError,
} = errorMessages;

export default class GoalForm extends Component {

  constructor(props){
    super(props);
  }

  static propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    types: PropTypes.array,
    index: PropTypes.number,
    canSubmit: PropTypes.bool,
  }

  getOptions = () => {
    return this.props.types.map( (type) =>
      <MenuItem key={type.id} value={type.id} primaryText={type.name} />
    );
  }

  onChangeHasEnd = (event, value) => {
    AppDispatcher.dispatch({
      action: ActionType.GOAL.HASEND,
      hasEnd: value,
      index: this.props.index,
    });
  }
  getCardContent = () => {
    const goalType = this.props.data.goal_type || {};
    return (
      <Row around="xs">
        <Col xs>
          <FormsySelect
            name="goal_type_id"
            floatingLabelText="Tipo"
            maxHeight={300}
            value={goalType.id}
          >
            {this.getOptions()}
          </FormsySelect>
        </Col>
        <Col xs>
          <FormsyToggle
            name='has_end_date'
            label='Tem fim?'
            labelPosition='left'
            onChange={this.onChangeHasEnd}
            defaultToggled={this.props.data.has_end_date}
          />
          <div>
            <FormsyText
              name='year_init'
              floatingLabelText='Ano de início do objetivo'
              validations="isNumeric"
              validationError={numericError}
              value={this.props.data.year_init}
            />
            {this.props.data.has_end_date && <FormsyText
              name='year_end'
              floatingLabelText='Ano de fim do objetivo'
              validations="isNumeric"
              validationError={numericError}
              value={this.props.data.year_end}
            /> }
          </div>
        </Col>
        <Col xs>
          <FormsyText
            name="periodicity"
            validations="isNumeric"
            validationError={numericError}
            hintText="Em anos. Ex: 10"
            floatingLabelText="Periodicidade"
            value={this.props.data.periodicity}
          />
          <FormsyText
            name="value"
            validations="isNumeric"
            validationError={numericError}
            hintText="Valor em R$. Ex.: 000.00"
            floatingLabelText="Valor"
            value={this.props.data.value}
          />
        </Col>
      </Row>
    );
  }

  render = () => {
    return (
      <SubForm
        name="goal"
        action={ActionType.GOAL.SUBFORM}
        parent_id={this.props.id}
        parent_name='goal_manager_id'
        title="Goal"
        index={this.props.index}
        canSubmit={this.props.canSubmit}
      >
        <CardForm
          titleCard="Objetivo"
          subtitleCard="Insira as informações do objetivo"
          contentCard={this.getCardContent()}
        />
      </SubForm>
    );
  }
}


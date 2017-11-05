import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
// import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import RegularCostStore from '../stores/RegularCostStore';
import '../stylesheet/RegisterForms.sass';
import getSelectOption from '../utils/getSelectOption';

import {FormsyText} from 'formsy-material-ui/lib';
import errorMessages from '../utils/FormsErrorMessages';
import SubForm from '../components/SubForm';
import MenuItem from 'material-ui/MenuItem';
import {FormsySelect} from 'formsy-material-ui/lib';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

var {
  numericError,
} = errorMessages;

export default class RegularCostRegister extends Component {

  constructor(props){
    super(props);
    this.state = RegularCostStore.getState();
  }

  addCost = () => {
    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.ADD
    });
  }

  removeCost = (index) => {
    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.REMOVE,
      index: index
    });
  }

  componentWillMount = () => {
    this.setState({
      listener: RegularCostStore.addListener(this.handleChange)
    });

    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.TYPE
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    this.setState(RegularCostStore.getState());
  }

  submit = () => {
    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.SUBMIT
    });
  }

  componentDidMount = () => {
    // Create a regular cost when mount component because
    // create it when create regular costs cause Invariant Violation
    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.MANAGER
    });
  }

  getOptions = () => {
    return this.state.types.map( (type) =>
      <MenuItem key={type.id} value={type.id} primaryText={type.name} />
    );
  }

  getContentCard = (cost) => {
    const labelRemove = 'Tenho este custo fixo?';
    const costType = cost.cost_type || {};

    return (
      <Row around="xs">
        <Col xs>
          <FormsySelect
            name="cost_type_id"
            floatingLabelText="Tipo"
            maxHeight={300}
            value={costType.id}
          >
            {this.getOptions()}
          </FormsySelect>
        </Col>
        <Col xs>
          <FormsyText
            name="value"
            validations="isNumeric"
            validationError={numericError}
            hintText="000.00"
            floatingLabelText="Valor"
            value={cost.value}
          />
        </Col>
        <Col xs>
          {getSelectOption(
            this.removeCost.bind(this, cost.index), true, labelRemove)
          }
        </Col>
      </Row>
    );
  }

  addElement(){
    return (
      <Row around="xs">
        <Col xs>
        </Col>
        <Col xs>
          <FloatingActionButton key='0' onClick={this.addCost} >
            <ContentAdd />
          </FloatingActionButton>
        </Col>
        <Col xs>
        </Col>
      </Row>
    );
  }

  render() {

    return (
      <Card className='Card'>
        <CardTitle
          title="Custo fixo"
          subtitle="Insira o(s) valor(es) do(s) custo(s) fixo(s)"
        />
        <CardText>
          <div>
            {this.state.costs.map( cost =>
              <div key={cost.index}>
                <SubForm
                  name="regular_cost"
                  action={ActionType.REGULARCOST.SUBFORM}
                  parent_id={this.state.regularCostManager.id}
                  parent_name='cost_manager_id'
                  title="cost"
                  index={cost.index}
                  canSubmit={this.state.canSubmit}
                >
                  {this.getContentCard(cost)}
                </SubForm>
              </div>
            )}

            <RaisedButton
              primary
              label="Salvar"
              style={{float: 'right'}}
              onClick={this.submit}
            />
          </div>
          {this.addElement()}
        </CardText>
      </Card>
    );
  }
}

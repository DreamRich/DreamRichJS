import React, {Component} from 'react';
import {FormsyText} from 'formsy-material-ui/lib';
import {FormsyDate} from '../utils/formsyComponents/FormsyComponents';
import errorMessages from '../utils/FormsErrorMessages';
import ClientSubForm from './ClientSubForm';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Checkbox from 'material-ui/Checkbox';
import CardForm from '../layout/CardForm';
import ActionType from '../actions/ActionType';
import ClientStore from '../stores/ClientStore';
import AppDispatcher from '../AppDispatcher';

var {
  wordsError,
} = errorMessages;

export default class ClientDependentForm extends Component {
  constructor(props){
    super(props);
    const {dependents, key} = ClientStore.getState();
    this.state = {dependents, key};
  }

  static propTypes = {
    id: PropTypes.number,
    canSubmit: PropTypes.bool,
  }

  componentWillMount = () => {
    this.setState({ listener: ClientStore.addListener(this.handleChange)});
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    const {dependents, key} = ClientStore.getState();
    this.setState({dependents, key});
  }


  addDependent = () => AppDispatcher.dispatch({
    action: ActionType.CLIENT.ADDDEPENDENT
  })

  removeDependent = (key) => AppDispatcher.dispatch({
    action: ActionType.CLIENT.REMOVEDEPENDENT,
    key: key,
  })

  getContentCard(){
    return (
      <Row around="xs">
        <Col xs>
          <FormsyText
            name="name"
            validations="isWords"
            validationError={wordsError}
            hintText="Nome do dependente"
            floatingLabelText="Nome"
          />
        </Col>
        <Col xs>
          <FormsyText
            name="surname"
            validations="isWords"
            validationError={wordsError}
            hintText="Sobrenome do dependente"
            floatingLabelText="Sobrenome"
          />
        </Col>
        <Col xs>
          <FormsyDate
            name="birthday"
            floatingLabelText="Data de Nascimento"
          />
        </Col>
      </Row>
    );
  }

  getSelectOption(selectOption,isChecked,labelOption){
    return (
      <Checkbox
        label={labelOption}
        checked={isChecked}
        onClick={selectOption}
        style={{margin: '30px 0px 30px 0px'}}
      />
    );
  }

  getDependentsKeys = () => Object.keys(this.state.dependents)

  render = () => {
    let subtitleCard = 'Insira as informações correspondentes as ' +
     'informações do dependente.';
    let labelAdd = (this.state.dependents.length === 0 ?
      'O cliente possui dependentes? (Marque o quadrado ao lado caso haja).' :
      'O cliente possui mais dependentes? (Marque o quadrado ao lado' +
      ' caso haja).');
    let labelRemove='O cliente possui não dependentes? '+
      '(Desmarque o quadrado ao lado caso não haja).';
    console.log(this.state.dependents);

    return (
      <div>
        {this.getDependentsKeys().map( (index) => {
          //const dependent = this.state.dependents[index];
          console.log(index);
          return (
            <div key={index}>
              {this.getSelectOption(
                this.removeDependent.bind(this, index), true, labelRemove)
              }
              <ClientSubForm
                name="dependent"
                action={ActionType.CLIENT.POSTMULTIFORM}
                title="Dependente"
                parent_name='active_client_id'
                parent_id={this.props.id}
                index={index}
                canSubmit={this.props.canSubmit}
              >
                <CardForm
                  titleCard='Dependentes'
                  subtitleCard={subtitleCard}
                  contentCard={this.getContentCard()}
                />
              </ClientSubForm>
            </div>
          );
        })
        }

        {this.getSelectOption(this.addDependent, false, labelAdd)}
      </div>
    );
  }
}

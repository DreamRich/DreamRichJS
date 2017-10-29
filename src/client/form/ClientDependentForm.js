import React, {Component} from 'react';
import {FormsyText} from 'formsy-material-ui/lib';
import {FormsyDate} from '../../utils/formsyComponents/FormsyComponents';
import errorMessages from '../../utils/FormsErrorMessages';
import SubForm from '../../components/SubForm';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Checkbox from 'material-ui/Checkbox';
import CardForm from '../../components/CardForm';
import ActionType from '../../actions/ActionType';
import ClientStore from '../../stores/ClientStore';
import AppDispatcher from '../../AppDispatcher';

var {
  wordsError,
} = errorMessages;

export default class ClientDependentForm extends Component {
  constructor(props){
    super(props);
    const {dependents} = ClientStore.getState();
    this.state = {dependents};
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
    const {dependents} = ClientStore.getState();
    this.setState({dependents});
  }


  addDependent = () => AppDispatcher.dispatch({
    action: ActionType.CLIENT.ADDDEPENDENT
  })

  removeDependent = (key) => AppDispatcher.dispatch({
    action: ActionType.CLIENT.REMOVEDEPENDENT,
    key: key,
  })

  getContentCard(dependent){
    return (
      <Row around="xs">
        <Col xs>
          <FormsyText
            name="name"
            validations="isWords"
            validationError={wordsError}
            hintText="Nome do dependente"
            floatingLabelText="Nome"
            value={dependent.name}
          />
        </Col>
        <Col xs>
          <FormsyText
            name="surname"
            validations="isWords"
            validationError={wordsError}
            hintText="Sobrenome do dependente"
            floatingLabelText="Sobrenome"
            value={dependent.surname}
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

  render = () => {
    let subtitleCard = 'Insira as informações correspondentes as ' +
     'informações do dependente.';
    let labelAdd = (this.state.dependents.length === 0 ?
      'O cliente possui dependentes? (Marque o quadrado ao lado caso haja).' :
      'O cliente possui mais dependentes? (Marque o quadrado ao lado' +
      ' caso haja).');
    let labelRemove='O cliente possui não dependentes? '+
      '(Desmarque o quadrado ao lado caso não haja).';

    return (
      <div>
        {this.state.dependents.map( (dependent) => {
          //const dependent = this.state.dependents[index];
          //console.log(index);
          const index = dependent.index;
          return (
            <div key={index}>
              {this.getSelectOption(
                this.removeDependent.bind(this, index), true, labelRemove)
              }
              <SubForm
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
                  contentCard={this.getContentCard(dependent)}
                />
              </SubForm>
            </div>
          );
        })
        }

        {this.getSelectOption(this.addDependent, false, labelAdd)}
      </div>
    );
  }
}

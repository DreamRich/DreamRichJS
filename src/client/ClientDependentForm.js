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

var {
  wordsError,
} = errorMessages;

export default class ClientDependentForm extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    parent_id: PropTypes.number,
  }

  state = {
    dependents: [],
    key: 0
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if (nextProps.parent_id!== undefined) {
      this.setState({id: nextProps.parent_id});
    }
  }

  addDependent = () => {
    this.setState({
      dependents: [...this.state.dependents,
        this.state.key],
      key: this.state.key + 1
    });
  }

  removeDependent = (key) => {
    const array = this.state.dependents.slice();
    this.setState({
      dependents: array.filter(e => e !== key),
    });
  }

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

  render = () => {
    let subtitleCard = 'Insira as informações correspondentes as informações do dependente.';
    let labelAdd='O cliente possui dependentes? (Marque o quadrado ao lado caso haja).';
    let labelRemove='O cliente possui não dependentes? (Desmarque o quadrado ao lado caso não haja).';

    return (
      <div>
        {this.state.dependents.map(e =>
          <div key={e}>
            {this.getSelectOption(this.removeDependent.bind(this, e), true,labelRemove)}
            <ClientSubForm
              name="dependent"
              action={ActionType.CLIENT.SUBFORM}
              title="Dependente"
              parent_name='active_client_id'
              parent_id={this.props.parent_id}>
              <CardForm
                titleCard='Dependentes'
                subtitleCard={subtitleCard}
                contentCard={this.getContentCard()}
              />
            </ClientSubForm>
          </div>
        )}

        {this.getSelectOption(this.addDependent, false, labelAdd)}
      </div>
    );
  }
}

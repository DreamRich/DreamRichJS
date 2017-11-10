import React, {Component} from 'react';
//import {FormsyText} from 'formsy-material-ui/lib';
//import {FormsyDate} from '../../utils/formsyComponents/FormsyComponents';
//import getDivider from '../../utils/getDivider';
//import ContentClear from 'material-ui/svg-icons/content/clear';
//import IconButton from 'material-ui/IconButton';
//import errorMessages from '../../utils/FormsErrorMessages';
import SubForm from '../../components/SubForm';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import ActionType from '../../actions/ActionType';
import ClientStore from '../../stores/ClientStore';
import AppDispatcher from '../../AppDispatcher';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import EditTableForm from '../../components/EditTableForm';

//var {wordsError,} = errorMessages;

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

  getRowsTable(name,surname,date){

    console.log(name,surname,date);
    return [
      {'columns': [
        {'value': name},
        {'value': surname},
        {'value': date},
      ]},
    ];
  }

  getContentCard(dependent){

    const headers = [
      {value: 'Nome', type: 'TextField', width: 200},
      {value: 'Sobrenome', type: 'TextField', width: 200},
      {value: 'Data do aniversário', type: 'DatePicker', width: 200},
    ];

    return (
      <div>
        <EditTableForm
          headerTable={headers}
          rowsTable={this.getRowsTable(dependent.name,dependent.surname,dependent.birthday)}
        />
      </div>
    );
  }

  addElement(){
    return (
      <Row around="xs">
        <Col xs>
        </Col>
        <Col xs>
          <FloatingActionButton key='0' onClick={this.addDependent} >
            <ContentAdd />
          </FloatingActionButton>
        </Col>
        <Col xs>
        </Col>
      </Row>
    );
  }

  render = () => {
    const subtitleCard = 'Insira as informações correspondentes as ' +
     'informações do dependente.';

    return (
      <Card className='Card' >
        <CardTitle
          title='Dependente'
          subtitle={subtitleCard}
        />
        <CardText>
          <div>
            {this.state.dependents.map( (dependent) => {
              const index = dependent.index;
              return (
                <div key={index}>
                  <SubForm
                    name="dependent"
                    action={ActionType.CLIENT.POSTMULTIFORM}
                    title="Dependente"
                    parent_name='active_client_id'
                    parent_id={this.props.id}
                    index={index}
                    canSubmit={this.props.canSubmit}
                  >
                    {this.getContentCard(dependent, index)}
                  </SubForm>
                </div>
              );
            })}
          </div>
        </CardText>
      </Card>
    );
  }
}

/*
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
              value={dependent.birthday}
              isFormDisabled={false}
            />
          </Col>
          <Col xs>
            <IconButton
              key={'clear1'+index}
              tooltip="Remover dependentes"
              tooltipPosition="top-center"
              onClick={this.removeDependent.bind(this, index)}
            >
              <ContentClear style={{color: '#C01F1F'}} key={'clear'+index}/>
            </IconButton>
          </Col>
        </Row>
  {getDivider()}
  */

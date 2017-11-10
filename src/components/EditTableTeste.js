import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import ActionType from '../actions/ActionType';
import ClientStore from '../stores/ClientStore';
import AppDispatcher from '../AppDispatcher';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';

/* Add formsy text */
import {FormsyText} from 'formsy-material-ui/lib';
import IconButton from 'material-ui/IconButton';
import errorMessages from '../utils/FormsErrorMessages';
import SubForm from '../components/SubForm';
var {wordsError,} = errorMessages;

export default class EditTableTeste extends Component {

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

  getContentCard(dependent, index){

    return (
      <Row around="xs">
        <Col xs>
          <ContentAdd />
        </Col>
        <Col xs>
          <FormsyText
            name="name"
            validations="isWords"
            validationError={wordsError}
            hintText="Nome do dependente"
            value={dependent.name}
          />
        </Col>
        <Col xs>
          <FormsyText
            name="surname"
            validations="isWords"
            validationError={wordsError}
            hintText="Sobrenome do dependente"
            value={dependent.surname}
          />
        </Col>
        <Col xs>
          <FormsyText
            name="surname"
            validations="isWords"
            validationError={wordsError}
            hintText="Sobrenome do dependente"
            value={dependent.surname}
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
    );
  }

  addElement(){
    return (
      <Row>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={6}>
              <FloatingActionButton key='0' onClick={this.addDependent} >
                <ContentAdd />
              </FloatingActionButton>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  getHeader(listHeader){

    const header = listHeader.map((element, index)=> {
      return (
        <Col key={'headerColumnTable'+index} xs>
          <h1>{element}</h1>
        </Col>
      );
    });

    return (<Row>{header}</Row>);
  }

  getBody(){

    return (
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
    );
  }

  render = () => {
    var listHeader = ['Salvar', 'Nome', 'Sobrenome', 'Data de aniversário', 'Remover'];
    return (
      <Card className='Card' >
        <CardTitle
          title='Exemplo'
          subtitle='Exemplo'
        />
        <CardText>
          <div>
            {this.getHeader(listHeader)}
            <Divider/>
            {this.getBody()}
            <Divider/>
            {this.getBody()}
          </div>
        </CardText>
      </Card>
    );
  }
}

/*
 *Fazer o header = Fazer uma lista com as strings das colunas DONE
 * Fazer com que o método getHeader() ele adicione no array no começo o salvar e no fim remover
 * Fazer o body só fazer aparecer os icones e elementos sem fucionalidade
  *
  */

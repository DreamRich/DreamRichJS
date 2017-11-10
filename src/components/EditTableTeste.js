import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import ActionType from '../actions/ActionType';
import ClientStore from '../stores/ClientStore';
import AppDispatcher from '../AppDispatcher';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



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

  getContentCard(){

    return (0);
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
      <Row around="xs">
        <Col xs>
          <TextField
            id={'1'}
            value={'value'}
          />
        </Col>
        <Col xs>
          <TextField
            id={'1'}
            value={'value'}
          />
        </Col>
        <Col xs>
          <TextField
            id={'1'}
            value={'value'}
          />
        </Col>
      </Row>
    );
  }

  render = () => {
    var listHeader = ['Nome', 'Sobrenome', 'Data de aniversário'];
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
          </div>
        </CardText>
      </Card>
    );
  }
}

/*
  *Fazer o header = Fazer uma lista com as strings das colunas
  *Fazer o body só fazer aparecer os icones e elementos sem fucionalidade
  *
  */

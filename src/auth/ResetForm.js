import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from '../layout/Title';
import Subtitle from '../layout/Subtitle';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
import Formsy from 'formsy-react';
import PasswordStore from '../stores/PasswordStore';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';

import {FormsyText} from 'formsy-material-ui/lib';

export default class ResetForm extends Component{
  constructor(props){
    super(props);

    Formsy.addValidationRule('emailExist', () => {
      return this.state.emailExist;
    });

    this.invalidMessage = {isEmail: 'E-mail inválido', 
      emailExist: 'E-mail não cadastrado'};
    this.sendedMessage = 'Informe o endereço de e-mail associado à sua conta e enviaremos instruções para a recuperação de sua senha.';
    this.unsendedMessage = 'Confira sua caixa de entrada. As instruções para a recuperação de sua senha foram enviadas para: ';
  }

  componentWillMount = () => {
    this.setState({...PasswordStore.getState(), listener: PasswordStore.addListener(this.handleUpdate)} );
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleUpdate = () => {
    this.setState(PasswordStore.getState());
  }

  handleSubmit = (data) => {
    AppDispatcher.dispatch({
      actionType: ActionType.PASSWORD.RESET,
      data: data,
    });
  }

  getForm = () => {
    let button = null;

    if(!this.state.send){
      button = <RaisedButton primary label="RECUPERAR" type="submit" />;
    } else {
      button = <RaisedButton primary label="LOGIN" type="submit" containerElement={<Link to="/login" />} />;
    }

    return (
      <Formsy.Form ref={ (form) => {this.form = form;}}
        onValidSubmit={this.handleSubmit}
        onInvalid={() => {this.setState({emailExist: true});}}
      >
      <FormsyText type="text"
        name="email"
        validations={{isEmail: true, emailExist: true}}
        validationErrors={this.invalidMessage}
        required
        hintText="Informe seu email cadastrado"
        floatingLabelText="E-mail" />
        <br />
        <br />
      {button}
      </Formsy.Form>);
  }
  render(){

    return (
      <div className="container">
        <div className="button-left">
          <FlatButton primary className="back-btn" label="VOLTAR"/>
        </div>
        <section>
          <Title style={{fontSize: '48px'}} label="Recuperação de senha" />
          <Subtitle style={{fontSize: '22px', textAlign:'left'}} label={!this.state.send? this.sendedMessage : this.unsendedMessage} />
        <br />
          {this.getForm()}
        <br />
        </section>
      </div>
    );
  }
}
ResetForm.propTypes = {
  email: PropTypes.string,
};

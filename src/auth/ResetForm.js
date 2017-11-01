import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
import Formsy from 'formsy-react';
import PasswordStore from '../stores/PasswordStore';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

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

  static propTypes = {
    email: PropTypes.string,
  }

  componentWillMount = () => {
    this.setState({...PasswordStore.getState(), listener: PasswordStore.addListener(this.handleUpdate)} );
  }

  componentWillUnmount = () => {
    AppDispatcher.dispatch({
      action: ActionType.PASSWORD.UNMOUNT
    });
    this.state.listener.remove();
  }

  handleUpdate = () => {
    this.setState(PasswordStore.getState());
    this.form.validateForm();
  }

  handleSubmit = (data) => {
    AppDispatcher.dispatch({
      action: ActionType.PASSWORD.RESET,
      data: data,
    });
  }

  getForm = () => {
    let button = null;

    if(this.state.openSendedMessage){
      button = <RaisedButton primary label="RECUPERAR" type="submit" />;
    } else {
      button = <RaisedButton primary label="LOGIN" containerElement={<Link to="/login" />} />;
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
          disabled={!this.state.openSendedMessage}
          hintText="Informe seu email cadastrado"
          floatingLabelText="E-mail" />
        <br />
        <br />
        {button}
      </Formsy.Form>);
  }

  getHeader = () => {
    return (
      <div className="container">
        <div className="button-left">
          <FlatButton primary className="back-btn" label="VOLTAR"/>
        </div>
        <Title style={{fontSize: '48px'}} label="Recuperação de senha" />
        <Subtitle style={{fontSize: '22px', textAlign:'left'}} label={this.state.openSendedMessage? this.sendedMessage : this.unsendedMessage} />
        <br />
        {this.getForm()}
        <br />
      </div>);
  }
  render(){
    const toRender = (this.state.send? <CircularProgress /> : this.getHeader());
    return (
      <section>
        {toRender}
        <Snackbar
          open={this.state.snack}
          message={this.state.message}
          autoHideDuration={9000}
          onRequestClose={() => AppDispatcher.dispatch({action: ActionType.PASSWORD.SNACKCLOSE})}
        />
      </section>
    );
  }
}

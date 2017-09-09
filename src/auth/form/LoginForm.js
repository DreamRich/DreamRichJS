import React, {Component} from 'react';
import '../../stylesheet/LoginForm.sass';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import AppDispatcher from '../../AppDispatcher';
import LoginStore from '../../stores/LoginStore';
import ActionType from '../../actions/ActionType';


export default class LoginForm extends Component{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    Formsy.addValidationRule('userExist', () => {
      return this.state.userExist;
    });

    this.invalidMessage = 'Usuário e/ou senha inválidos.';
  }

  componentWillMount = () => {
    this.setState({...LoginStore.getState(), listener: LoginStore.addListener(this.validateForm)} );
  }

  validateForm = () => {
    this.setState(LoginStore.getState());
    this.form.validateForm();
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleSubmit(data){
    AppDispatcher.dispatch({
      actionType: ActionType.LOGIN.POST,
      data: data,
    });
  }

  render(){
    return (
      <Formsy.Form ref={ (form) => {this.form = form;}}
        onInvalid={() => {this.setState({userExist: true});} }
        onValidSubmit={this.handleSubmit}>
        <FormsyText type="text"
          name="username"
          required
          hintText="E-mail ou nome de usuário"
          floatingLabelText="Usuário"
          validations = "userExist"
          validationError={' '}
        />
        <br/>
        <FormsyText type="password"
          name="password"
          required
          hintText="Senha"
          floatingLabelText="Senha"
          validations = "userExist"
          validationError={this.invalidMessage} />
        <br/><br/>
        <RaisedButton primary label="ENTRAR" type="submit"/>
        <br/><br/>
      </Formsy.Form>

    );
  }
}

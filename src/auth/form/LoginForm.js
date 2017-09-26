import React, {Component} from 'react';
import '../../stylesheet/LoginForm.sass';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import AppDispatcher from '../../AppDispatcher';
import LoginStore from '../../stores/LoginStore';


export default class LoginForm extends Component{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {listeners: []};

    Formsy.addValidationRule('userExist', () => {
      return this.state.userExist;
    });

    this.invalidMessage = 'Usuário e/ou senha inválidos.';
  }

  componentWillMount = () => {
    this.setState( LoginStore.getState() );
    this.state.listeners.push(LoginStore.addListener(this.validateForm));
    console.log(this.state.listeners);
  }

  validateForm = () => {
    this.setState(LoginStore.getState());
    this.form.validateForm();
  }

  componentWillUnmount = () => {
    this.state.listeners.forEach((listener) => {
      listener.remove();
    });
  }



  componentDidUpdate(){
    console.log('e');
  //  this.form.validateForm();
  }

  handleSubmit(data){
    console.log(data);
    AppDispatcher.dispatch({
      actionType: 'login/post',
      data: data,
    });
  }

  render(){
    return (
      <Formsy.Form ref={ (form) => {this.form = form;} }
        onValidSubmit={this.handleSubmit}
        onInvalid={() => {this.setState({userExist: true});}}
      >
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

import React, {Component} from 'react';
import '../../stylesheet/LoginForm.sass';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import {postData} from '../../resources/Requests';
import {Auth} from '../Auth';


export default class LoginForm extends Component{

  constructor(props){
    super(props);
    this.state={send: false, userExist: true};
    this.handleSubmit = this.handleSubmit.bind(this);

    Formsy.addValidationRule('userExist', () => {
      return this.state.userExist;
    });

    this.invalidMessage = 'Usuário e/ou senha inválidos.';
  }

  handleSubmit(data){
    // console.log(data);
    // console.log(event.target.username.value);
    // console.log(event.target.password.value);
    postData('/api/auth/',
      data,
      Auth.authenticate,
      () => {
        this.setState({userExist: false});
        this.form.validateForm();
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

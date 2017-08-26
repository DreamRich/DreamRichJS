import React, {Component} from 'react';
import {Auth} from '../Auth';
import '../../stylesheet/LoginForm.sass';
import Title from '../../layout/Title';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// import {AuthorizedRoute, AuthorizedLink} from './routes/Router';

export default class LoginForm extends Component{

  handleForm(event){
    event.preventDefault();
    console.log(event.target.username.value);
    console.log(event.target.password.value);
    fetch('/api/auth/',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value
      })
    })
    .then((e) => e.json())
    .then(Auth.authenticate)
    .catch((e) => {console.log(e);});
  }

  render(){
    return (
      <form onSubmit={this.handleForm} >
        <Title title="Faça login" />
        <TextField type="text" name="username" hintText="Seu usuário (CPF) ..." floatingLabelText="Usuário"/>
        <br/>
        <TextField type="password" name="password" hintText="Sua senha ..."  floatingLabelText="Senha"/>
        <br/>
        <RaisedButton primary label="ENTRAR" />
      </form>
    );
  }
}

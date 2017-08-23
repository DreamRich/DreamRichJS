import React, {Component} from 'react';
import {Auth} from './Auth';
import '../stylesheet/LoginForm.sass';

export default class LoginForm extends Component{

  handleForm(event){
    event.preventDefault();
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
      <p className="iRich_login">iRich</p>
      <p className="do-login">Faça login</p>
      <input type="text" className='input-text' name='username'/>
      <br />
      <br />
      <input className='input-text' name='password'/>
      <br />
      <br />
      <button className='highlight-btn'>ENTRAR</button>
    </form>
    );
  }
}

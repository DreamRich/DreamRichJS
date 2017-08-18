import React, {Component} from 'react';
import {Auth} from './Auth';

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
    .catch((e) => {console.log(e)});
  }

  render(){
    return (
    <form onSubmit={this.handleForm} >
      <label>Login</label>
      <input type="text" name='username'/>
      <br />
      <label>Password</label>
      <input type="password" name='password'/>
      <button>Submit</button>
    </form>
    );
  }
}

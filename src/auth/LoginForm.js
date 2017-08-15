import React, {Component} from 'react';

export default class LoginForm extends Component{

  handleForm(event){
    event.preventDefault();
    console.log(event.target.username.value);
    console.log(event.target.password.value);
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

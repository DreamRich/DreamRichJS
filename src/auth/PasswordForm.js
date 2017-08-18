import React, {Component} from 'react';
import {Auth} from './Auth';

export default class PasswordForm extends Component{
  constructor(props){
    super(props);
    this.handleForm = this.handleForm.bind(this);
  }
  handleForm(event){
    event.preventDefault();
    console.log(Auth.getHeader(), this.props.userid);
    const data = JSON.stringify({
        userid: this.props.userid,
        password: event.target.password.value,
        new_password: event.target.new_password.value,
        new_password_confirmation: event.target.new_password_confirmation.value
      });
    fetch('/api/auth/password/', {
      method: 'post',
      headers: Auth.getHeader(),
      body: data
    })
    .then((e) => {console.log('ok');})
    .catch((e) => {console.log('treta');});
  }
  render(){
    return (
      <form onSubmit={this.handleForm}>
        <label>Username</label>
        <input disabled value={this.props.username} />
        <input type="text" name="password" />
        <input type="text" name="new_password" />
        <input type="text" name="new_password_confirmation" />
        <button />
      </form>
    );
  }
}

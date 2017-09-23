import React, {Component} from 'react';
import {Auth} from '../Auth';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
      .then(() => {console.log('ok'); this.setState({send: true}); })
      .catch(() => {console.log('treta');});
  }

  render(){
    return (
      <section>
        <form onSubmit={this.handleForm}>
          <TextField floatingLabel="Usuário" disabled value={this.props.username} />
          <br />
          <TextField type="password"
            floatingLabelText="Senha"
            name="password"
            hintText="Digite sua senha antiga" />
          <br />
          <TextField
            floatingLabelText="Nova senha"
            name="new_password"
            hintText="Digite sua nova senha" />
          <br />
          <TextField
            floatingLabelText="Confirmação"
            name="new_password_confirmation"
            hintText="Confirme sua nova senha" />
          <br />
          <RaisedButton primary label="ALTERAR" />
        </form>
      </section>
    );
  }
}
PasswordForm.propTypes = {
  userid: PropTypes.string,
  username: PropTypes.string
};

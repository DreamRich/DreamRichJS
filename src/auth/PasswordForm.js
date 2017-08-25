import React, {Component} from 'react';
import {Auth} from './Auth';
import PropTypes from 'prop-types';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

export default class PasswordForm extends Component{
  constructor(props){
    super(props);
    this.state={password: '', new_password: '', new_password_confirmation: ''};
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
    .then(() => {console.log('ok');})
    .catch(() => {console.log('treta');});
  }

  handleChange(field, value){
    this.setState({[field]: value});
  }

  render(){
    return (
      <section>
        <form onSubmit={this.handleForm}>
          <Input label="Usuário" disabled value={this.props.username} />
          <Input type="password"
            label="Senha"
            name="password"
            hint="Digite sua senha antiga"
            value={this.state.password}
            onChange={this.handleChange.bind(this, 'password')}/>
          <Input
            label="Nova senha"
            name="new_password"
            hint="Digite sua nova senha"
            value={this.state.new_password}
            onChange={this.handleChange.bind(this, 'new_password')}/>
          <Input
            label="Confirmação"
            name="new_password_confirmation"
            hint="Confirme sua nova senha"
            value={this.state.new_password_confirmation}
            onChange={this.handleChange.bind(this, 'new_password_confirmation')}/>
          <Button raised primary label="ALTERAR" />
        </form>
      </section>
    );
  }
}
PasswordForm.propTypes = {
  userid: PropTypes.string,
  username: PropTypes.string
};

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import {postData} from '../../resources/Requests';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';

export default class PasswordForm extends Component{

  constructor(props){
    super(props);
    this.state = {};
    this.handleForm = this.handleForm.bind(this);
  }

  handleForm(data){
    console.log(this.props.userid);
    data.userid = this.props.userid;
    console.log(data);
    postData('/api/auth/password/',
      data,
      () => {
        this.setState({send: true}); 
      });
  }

  render(){
    return (
      <section>
        <Formsy.Form ref={ (form) => {this.form = form;} }
          onValidSubmit={this.handleForm}
        >
          <FormsyText type="text"
            name="username"
            disabled
            value={this.props.username}
            floatingLabelText="Usuário" />
          <FormsyText type="password" 
            name="password" 
            required 
            hintText="Digite sua senha antiga" 
            floatingLabelText="Senha" />
          <FormsyText type="password" 
            name="new_password" 
            required 
            hintText="Digite sua nova senha" 
            floatingLabelText="Nova senha" />
          <FormsyText type="password" 
            name="new_password_confirmation" 
            required 
            hintText="Confirme sua nova senha" 
            floatingLabelText="Confirmação" />
          <br />
          <RaisedButton primary label="ALTERAR" type="submit"/>
        </Formsy.Form>
      </section>
    );
  }
}
PasswordForm.propTypes = {
  userid: PropTypes.string,
  username: PropTypes.string
};

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from '../layout/Title';
import Subtitle from '../layout/Subtitle';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom';

export default class ResetForm extends Component{
  constructor(props){
    super(props);
    this.state={send: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    fetch('/api/auth/password/?email='+this.props.email)
    .then((() => {
      console.log('email send', this.state.send);
      this.setState({send: true}); 
    }).bind(this))
    .catch((e) => {console.log('problem in email sending', e);});
  }
  render(){
    let button = null;
    if(!this.state.send){
      button = <RaisedButton primary label="RECUPERAR" onClick={this.handleSubmit} />;
    } else {
      button = <RaisedButton primary label="LOGIN" type="submit" containerElement={<Link to="/login" />} />;
    }
    return (
      <section>
        <Title label="Recuperação de senha"/>
        <Subtitle label={!this.state.send?'Informe o endereço de e-mail associado à sua conta e enviaremos instruções para a recuperação de sua senha.': 'Confira sua caixa de entrada. As instruções para a recuperação de sua senha foram enviadas para: '} />
      <br />
        <TextField disabled={this.state.send} floatingLabelText="E-MAIL" name="email" hintText="Seu e-mail cadastrado" />
      <br />
        {button}
      </section>
    );
  }
}
ResetForm.propTypes = {
  email: PropTypes.string,
};

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from '../layout/Title';
import Subtitle from '../layout/Subtitle';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
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
    let email = null;
    if(!this.state.send){
      email = <TextField disabled={this.state.send} floatingLabelText="E-MAIL" name="email" hintText="Seu e-mail cadastrado" />;
      button = <RaisedButton primary label="RECUPERAR" onClick={this.handleSubmit} />;
    } else {
      email = <Title style={{fontSize: '30px', color:'#00D0A7'}} label={this.props.email} />;
      button = <RaisedButton primary label="LOGIN" type="submit" containerElement={<Link to="/login" />} />;
    }
    return (
      <div className="container">
        <div className="button-left">
          <FlatButton primary className="back-btn" label="VOLTAR"/>
        </div>
        <section>
          <Title style={{fontSize: '48px'}} label="Recuperação de senha" />
          <Subtitle style={{fontSize: '22px', textAlign:'left'}} label={!this.state.send?'Informe o endereço de e-mail associado à sua conta e enviaremos instruções para a recuperação de sua senha.': 'Confira sua caixa de entrada. As instruções para a recuperação de sua senha foram enviadas para:'} />
        <br />
          {email}
        <br />
        <br />
        <br />
          {button}
        </section>
      </div>
    );
  }
}
ResetForm.propTypes = {
  email: PropTypes.string,
};

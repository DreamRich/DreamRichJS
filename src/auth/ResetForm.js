import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from '../layout/Title';
import Subtitle from '../layout/Subtitle';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
import Formsy from 'formsy-react';

import {FormsyText} from 'formsy-material-ui/lib';

export default class ResetForm extends Component{
  constructor(props){
    super(props);
    this.state={send: false, emailExist: true};
    this.handleSubmit = this.handleSubmit.bind(this);

    Formsy.addValidationRule('emailExist', () => {
      return this.state.emailExist;
    });

    this.invalidMessage = {isEmail: 'E-mail inválido', 
      emailExist: 'E-mail não cadastrado'};
    this.sendedMessage = 'Informe o endereço de e-mail associado à sua conta e enviaremos instruções para a recuperação de sua senha.';
    this.unsendedMessage = 'Confira sua caixa de entrada. As instruções para a recuperação de sua senha foram enviadas para: ';
  }

  handleSubmit(){
    //const email = document.getElementsTagName
    const email = this.form.getCurrentValues();
    fetch('/api/auth/password/?email='+email.name)
    .then((response) => {
      if(!response.ok){
        this.setState({emailExist: false});
        this.form.validateForm();
      } else {
        this.setState({send: true});  
      }
    })
    .catch((e) => {console.log('problem in email sending', e);});
  }
  
  render(){

    let button = null;

    if(!this.state.send){
      button = <RaisedButton primary label="RECUPERAR" onClick={this.handleSubmit} />;
    } else {
      button = <RaisedButton primary label="LOGIN" type="submit" containerElement={<Link to="/login" />} />;
    }

    let textfield = <FormsyText name="E-MAIL" validations={{isEmail: true, emailExist: true}}
            validationErrors={this.invalidMessage} 
            required hintText="Seu e-mail cadastrado" floatingLabelText="E-MAIL"/>;

    return (
      <div className="container">
        <div className="button-left">
          <FlatButton primary className="back-btn" label="VOLTAR"/>
        </div>
        <section>
          <Title style={{fontSize: '48px'}} label="Recuperação de senha" />
          <Subtitle style={{fontSize: '22px', textAlign:'left'}} label={!this.state.send? this.sendedMessage : this.unsendedMessage} />
        <br />
        <Formsy.Form ref={ (form) => {this.form = form;} } onInvalid={() => {this.setState({emailExist: true});}}>
          {textfield}
        </Formsy.Form>
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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from '../layout/Title';
import Subtitle from '../layout/Subtitle';

export default class ResetForm extends Component{
  constructor(props){
    super(props);
    this.state={email: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    fetch('/api/auth/password/?email='+this.props.email)
    .then(() => {console.log('email send');})
    .catch((e) => {console.log('problem in email sending', e);});
  }
  handleChange(email, value){
    this.setState({email: value});
  }
  render(){
    return (
      <section>
        <Title label="Recuperação de senha"/>
        <Subtitle label="Informe o endereço de e-mail associado à sua conta e enviaremos instruções para a recuperação de sua senha." />
        <input text="E-MAIL" label="E-MAIL" name="email" hint="Seu e-mail cadastrado" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/>
      <button primary raised label="RECUPERAR" onClick={this.handleSubmit} />
      </section>
    );
  }
}
ResetForm.propTypes = {
  email: PropTypes.string,
};

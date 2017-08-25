import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

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
        <Input text="email" label="e-mail" name="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/>
      <Button primary raised label="Resetar" />
      </section>
    );
  }
}
ResetForm.propTypes = {
  email: PropTypes.string,
};

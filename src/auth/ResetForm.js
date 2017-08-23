import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ResetForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    fetch('/api/auth/password/?email='+this.props.email)
    .then(() => {console.log('email send');})
    .catch((e) => {console.log('problem in email sending', e);});
  }
  render(){
    return (
      <button onClick={this.handleSubmit} />
    );
  }
}
ResetForm.propTypes = {
  email: PropTypes.string,
};

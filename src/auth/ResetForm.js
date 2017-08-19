import React, {Component} from 'react';

export default class ResetForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    fetch('/api/auth/password/?email='+this.props.email)
    .then((e) => {console.log('email send')})
    .catch((e) => {console.log('problem in email sending', e)});
  }
  render(){
    return (
      <button onClick={this.handleSubmit} />
    );
  }
}

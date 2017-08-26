import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../layout/Title';
import LoginForm from './form/LoginForm';

// import {AuthorizedRoute, AuthorizedLink} from './routes/Router';

export default class LoginPage extends Component{

  render(){
    return (
      <div>
        <p className="iRich_login">DreamRich</p>
        <Title title="Faça login" />
        <LoginForm />
        <Link to="/login/resetpassword" className="forgot-password">Esqueceu a senha?</Link>
      </div>
    );
  }
}

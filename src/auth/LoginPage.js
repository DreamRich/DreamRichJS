import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import LoginForm from './form/LoginForm';

// import {AuthorizedRoute, AuthorizedLink} from './routes/Router';

export default class LoginPage extends Component{

  render(){
    return (
      <div>
        <Title label = "DreamRich" />
        <Subtitle label="Faça login" />
        <LoginForm />
        <Link to="/login/resetpassword" className="forgot-password">Esqueceu a senha?</Link>
      </div>
    );
  }
}

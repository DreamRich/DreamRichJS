import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../layout/Title';
import Subtitle from '../layout/Subtitle';
import LoginForm from './form/LoginForm';
import { Row, Col } from 'react-flexbox-grid';

// import {AuthorizedRoute, AuthorizedLink} from './routes/Router';

export default class LoginPage extends Component{

  render(){
    return (
      <Row>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={6}>
              <Title  label = "iRich" />
              <Subtitle style={{marginTop: '50px', marginBottom: '50px', marginLeft: '0px'}} label="Faça login" />
              <LoginForm />
              <Link to="/login/resetpassword" className="forgot-password">Esqueceu a senha?</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

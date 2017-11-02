import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router';
import { Row, Col } from 'react-flexbox-grid';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import LoginForm from './form/LoginForm';
import LoginStore from '../stores/LoginStore';

// import {AuthorizedRoute, AuthorizedLink} from './routes/Router';

class LoginPage extends Component{

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  }

  componentWillMount = () => this.setState({
    listener: LoginStore.addListener(this.handleChange)
  });

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => {
    const {auth} = LoginStore.getState();
    this.setState({auth});
  }

  render(){
    if (this.state.auth) {
      const state = this.props.location.state;
      const to = (state && state.from ? state.from : {pathname: '/'});
      return <Redirect to={to} />;
    }

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

export default withRouter(LoginPage);

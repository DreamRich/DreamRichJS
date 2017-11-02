import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import LoginForm from './form/LoginForm';
import { Row, Col } from 'react-flexbox-grid';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import LoginStore from '../stores/LoginStore';

// import {AuthorizedRoute, AuthorizedLink} from './routes/Router';

class LoginPage extends Component{

  static propTypes = {
    history: PropTypes.object,
    from: PropTypes.string,
  }

  componentWillMount = () => this.setState({
    listener: LoginStore.addListener(this.handleChange)
  });

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => {
    const {auth} = LoginStore.getState();

    if (auth) {
      this.props.history.replace(this.props.from || '/');
    }

  }

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

export default withRouter(LoginPage);

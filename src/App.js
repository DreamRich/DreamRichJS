import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import LoginForm from './auth/LoginForm';
import LogoutButton from './auth/LogoutButton';
import {Auth} from './auth/Auth';
import PasswordForm from './auth/PasswordForm';
import ResetForm from './auth/ResetForm';
import NotFound from './NotFound';
import {AuthorizedRoute, AuthorizedLink} from './routes/Router';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {'auth': false, 'begin': Date.now(), 'teste': true };
    this.updateDate = this.updateDate.bind(this);
    this.logOutHandle = this.logOutHandle.bind(this);
  }

  updateDate(){
    this.setState({'begin': Date.now()});
  }

  logOutHandle(time){
    console.log(Date.now() - this.state.begin, time);
    if(Auth.isAuthenticated() && Date.now() - this.state.begin > time) {
      Auth.deauthenticate();
    }
  }

  componentDidMount(){
    setInterval(()=>{ this.setState({'auth': Auth.isAuthenticated()});}, 1000);

    /* Add validation to logout when user don not make some moviment */
    const body = document.getElementsByTagName('body')[0];
    body.onmousemove = this.updateDate;
    body.onkeyup = this.updateDate;
    const oneMinute = 1000*60; // 1000 ms * 60 s = 1 min
    setInterval(this.logOutHandle, oneMinute, oneMinute*15);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
            <button onClick={() => {this.setState({'teste': !this.state.teste }); Auth.authenticate({token: 'ok'}); }} > {this.state.teste ? '1': '2'} </button>
          <img src={logo} className="App-logo" alt="logo" />
          { this.state.auth && <div>{Auth.getAuth()}</div>}
            <Link to="/">/ </Link>
            <Link to="/login">login </Link>
            <AuthorizedLink to="/logout">logout </AuthorizedLink>
            <AuthorizedLink to="/login/changepassword">change </AuthorizedLink>
            <Link to="/login/resetpassword">reset </Link>
        </div>
        <Switch>
          <Route exact path="/" render={() => (
            this.state.teste ?  ( null ) : ( <Redirect to="/login" /> )
          )
          } />
          <Route exact path="/login" component={ LoginForm } />
          <AuthorizedRoute path="/logout" component={ LogoutButton } />
          <AuthorizedRoute path="/login/changepassword" render={ () => <PasswordForm userid={3} username="Marcelo" /> } />
          <Route path="/login/resetpassword" render={ () => <ResetForm email="marcelohpf@hotmail.com" /> } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;

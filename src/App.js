import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './auth/LoginForm';
import LogoutButton from './auth/LogoutButton';
import {Auth} from './auth/Auth';
import PasswordForm from './auth/PasswordForm';
import ResetForm from './auth/ResetForm';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {'auth': false, 'begin': Date.now() };
    this.updateDate = this.updateDate.bind(this);
    this.logOutHandle = this.logOutHandle.bind(this);
  }

  updateDate(e){
    this.setState({'begin': Date.now()});
  }

  logOutHandle(time){
    console.log(Date.now() - this.state.begin, time)
    if(Auth.isAuthenticated() && Date.now() - this.state.begin > time) {
      Auth.deauthenticate();
    }
  }

  componentDidMount(){
    setInterval(()=>{ this.setState({'auth': Auth.isAuthenticated()})}, 1000);

    /* Add validation to logout when user don not make some moviment */
    const body = document.getElementsByTagName('body')[0];
    body.onmousemove = this.updateDate;
    body.onkeyup = this.updateDate;
    const oneMinute = 1000*60 // 1000 ms * 60 s = 1 min
    setInterval(this.logOutHandle, oneMinute, oneMinute*15);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          { this.state.auth && <div>{Auth.getAuth()}</div>}
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <LoginForm />
        <LogoutButton />
      <h2>Change forms</h2>
      <PasswordForm userid={3} username="Marcelo"/>
      <h2>Reset password</h2>
      <ResetForm email="marcelohpf@hotmail.com" />
      </div>
    );
  }
}

export default App;

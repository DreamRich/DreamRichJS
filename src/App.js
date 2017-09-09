import React, { Component } from 'react';
import './stylesheet/App.sass';
import {Auth} from './auth/Auth';

import {Link} from 'react-router-dom';
import {AuthorizedLink} from './routes/Router';
import Routers from './routes/Routers';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {'auth': false, 'begin': Date.now()};
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
            <RaisedButton primary onClick={() => {Auth.authenticate({token: 'ok'}); }} label="simulate login" />
          { this.state.auth && <div>{Auth.getAuth()}</div>}
            <Link to="/">home </Link>
            <Link to="/login">login </Link>
            <AuthorizedLink to="/logout">logout </AuthorizedLink>
            <AuthorizedLink to="/register/client">new client </AuthorizedLink>
            <AuthorizedLink to="/login/changepassword">change </AuthorizedLink>
            <AuthorizedLink to="/client">client </AuthorizedLink>
            <AuthorizedLink to="/employee">employee </AuthorizedLink>
        </div>
        <div className="conteiner">
          <Routers />
        </div>
      </div>
    );
  }
}

export default App;

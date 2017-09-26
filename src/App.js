import React, { Component } from 'react';
import './stylesheet/App.sass';
import {Auth} from './auth/Auth';

import {Link} from 'react-router-dom';
import {AuthorizedLink} from './routes/Router';
import Routers from './routes/Routers';
import RaisedButton from 'material-ui/RaisedButton';
import AppStore from './stores/AppStore';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {auth: false};
  }

  handleUpdate = () => {
    this.setState(AppStore.getState());
  }

  componentWillMount = () => {
    this.setState({ updateId: AppStore.addListener(this.handleUpdate) });
  }

  componentWillUnmount = () => {
    this.state.updateId.remove();
  }

  componentDidMount = () => {
    /* Add validation to logout when user don not make some moviment */
    const body = document.getElementsByTagName('body')[0];
    body.onmousemove = Auth.updateDate;
    body.onkeyup = Auth.updateDate;
    // TODO: Remove it with when add the flux pattern 
    // const second = 1000; // 1000 ms = 1 sec
    // setInterval(this.handleTimeLogout, second);
  }

  render = () => {
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

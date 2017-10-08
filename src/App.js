import React, { Component } from 'react';
import './stylesheet/App.sass';
import {Auth} from './auth/Auth';

import {Link} from 'react-router-dom';
import Routers from './routes/Routers';
import RaisedButton from 'material-ui/RaisedButton';
import AppStore from './stores/AppStore';

import SidebarMenu from './layout/SidebarMenu';

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
    Auth.deauthenticate();
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
    const paddingLeftDrawerOpen = 236;
    const styles = {
      container: {
        paddingLeft: paddingLeftDrawerOpen
      }
    };
    return (
      <div className="App">
        <SidebarMenu />
        <div className="App-header" style={styles.container}>
          <RaisedButton primary onClick={() => {Auth.authenticate({token: 'ok'}); }} label="simulate login" />
          { this.state.auth && <div>{Auth.getAuth()}</div>}
          { !this.state.auth && <Link to="/login">login </Link> }
          { this.state.auth && <Link to="/logout">logout </Link> }
        </div>
        <div style={styles.container}>
          <Routers />
        </div>
      </div>
    );
  }
}

export default App;

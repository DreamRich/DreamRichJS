import React, { Component } from 'react';
import './stylesheet/App.sass';
import Header from './layout/Header';
import SidebarMenu from './layout/SidebarMenu';
import Routers from './routes/Routers';
import AppStore from './stores/AppStore';
import AppDispatcher from './AppDispatcher';
import ActionType from './actions/ActionType';
import {Auth} from './auth/Auth';
import LoggerStore from './stores/LoggerStore';  // eslint-disable-line no-unused-vars
import Snackbar from 'material-ui/Snackbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = AppStore.getState();
  }

  componentWillMount = () => {
    this.setState({
      listener: AppStore.addListener(this.handleChange)
    });

    /* Add validation to logout when user don not make some moviment */
    const body = document.getElementsByTagName('body')[0];
    body.onmousemove = Auth.updateDate;
    body.onkeyup = Auth.updateDate;
    Auth.autoLogin();
  }

  componentWillUnmout = () => this.state.listener.remove()

  handleChangeRequestNavDrawer = () => AppDispatcher.dispatch({
    action: ActionType.APP.SWITCHNAVDRAWER,
  })

  handleToggle = () => AppDispatcher.dispatch({
    action: ActionType.APP.MENUTOGGLE, })

  handleChange = () => this.setState(AppStore.getState())

  render = () => {
    const { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 250;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
        margin: navDrawerOpen ? '90px 20px 20px 15px' : '90px 5% 0px 8%'
      }
    };

    return (
      <div className="App">
        <Header styles={styles.header}
          handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
          auth={this.state.auth}
        />
        <SidebarMenu auth={this.state.auth} navDrawerOpen={this.state.navDrawerOpen} />
        <div style={styles.container}>
          <Routers />
          <Snackbar
            open={this.state.snackOpen}
            message={this.state.snackMessage}
            autoHideDuration={9000}
            action='Ok'
            onRequestClose={
              () => AppDispatcher.dispatch({action: ActionType.USERFEEDBACK, snackOpen: false})
            }
          />
        </div>
      </div>
    );
  }
}

export default App;

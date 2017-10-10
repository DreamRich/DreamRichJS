import React from 'react';
import Menu from 'material-ui/Menu';
import {Link} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import {AuthorizedLink} from '../routes/Router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MenuStore from '../stores/MenuStore';
import {Auth} from '../auth/Auth';

const muiTheme = getMuiTheme({
  drawer: {
    color: '#00cea5'
  }
});

const styleText = {
  color: 'white',
  textAlign: 'left',
  textDecoration: 'none'
};

const menuWidth = {
  width: '225px'
};

const noneUnderline = {
  textDecoration: 'none'
};

export default class SidebarMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      auth: false
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  makeItemMenu = (permission,path,message,icon) => {
    return (
      <AuthorizedLink permission={permission} to={path} style={noneUnderline}>
        <MenuItem primaryText={message} style={styleText} leftIcon={icon} />
      </AuthorizedLink>
    );
  }

  handleUpdate = () => {
    this.setState(MenuStore.getState());
  }

  componentWillMount = () => {
    this.setState({ updateId: MenuStore.addListener(this.handleUpdate) });
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

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Drawer open={this.state.open}>
            {this.makeItemMenu('allow_any','/',<h1>iRich</h1>)}

            <Menu style={menuWidth}>
              {this.makeItemMenu('change_own_client_data','/register/client',
                'New Client', <PersonAdd />)}
              {this.makeItemMenu('see_all_basic_client_data','/client','Client')}
              {this.makeItemMenu('see_employee_data','/employee','Employee')}
              {this.makeItemMenu('allow_any','/goals','Goal')}

              <Divider />

              <MenuItem>
                <div className="menu-item-sidebar" style={styleText}>
                  { !this.state.auth && <Link style={styleText} to="/login">Login </Link> }
                  { this.state.auth && <Link style={styleText} to="/logout">Logout </Link> }
                </div>
              </MenuItem>
              {this.makeItemMenu('allow_any','/login/changepassword','Change Password')}
            </Menu>
          </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

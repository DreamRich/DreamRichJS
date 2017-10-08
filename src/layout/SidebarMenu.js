import React from 'react';
import Menu from 'material-ui/Menu';
import {Link} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import {AuthorizedLink} from '../routes/Router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PersonAdd from 'material-ui/svg-icons/social/person-add';

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

const noneUnderline = {
  textDecoration: 'none'
};

export default class SidebarMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      auth: true
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  makeItemMenu = (permission,path,message,icon) => {
    return (
      <AuthorizedLink permission={permission} to={path} style={noneUnderline}>
        <MenuItem style={styleText} leftIcon={icon}>
          {message}
        </MenuItem>
      </AuthorizedLink>
    );
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Drawer open={this.state.open}>

            {this.makeItemMenu('allow_any','/',<h1>iRich</h1>)}

            <Menu>
              <MenuItem style={styleText}>
                <strong>Olá, {'Bruce Wayne  -  '}</strong>
                { this.state.auth && <Link style={styleText} to="/logout">Logout</Link> }
              </MenuItem>

              <Divider />

              {this.makeItemMenu('change_own_client_data','/register/client',
                'New Client', <PersonAdd />)}
              {this.makeItemMenu('allow_any','/login/changepassword','Change Password')}
              {this.makeItemMenu('see_all_basic_client_data','/client','Client')}
              {this.makeItemMenu('see_employee_data','/employee','Employee')}
              {this.makeItemMenu('allow_any','/goals','Goal')}
            </Menu>
          </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import makeMenuItem from '../utils/makeMenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// TODO: Make css in a extern file
const muiTheme = getMuiTheme({
  drawer: {
    color: '#2E4155'
  },
});

const styleText = {
  color: 'white',
  textAlign: 'left',
  textDecoration: 'none',
  fontSize: 14
};

export default class SidebarMenu extends React.Component {

  render() {

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Drawer open={this.props.navDrawerOpen}>
            {makeMenuItem('allow_any','/',<h1>iRich</h1>,'',styleText)}

            <Divider />

            <Menu>
              {makeMenuItem('change_own_client_data','/register/client',
                'New Client', <PersonAdd />, styleText)}
              {makeMenuItem('see_all_basic_client_data','/client','Client','',styleText)}
              {makeMenuItem('see_employee_data','/employee','Employee','',styleText)}
              {makeMenuItem('allow_any','/goals','Goal','',styleText)}
            </Menu>
          </Drawer>
        </MuiThemeProvider>
        </div>
    );
  }
}

SidebarMenu.propTypes = {
  navDrawerOpen: PropTypes.bool.isRequired,
};

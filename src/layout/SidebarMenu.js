import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
//import Divider from 'material-ui/Divider';
import makeMenuItem from '../utils/makeMenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {white} from 'material-ui/styles/colors';


//{makeMenuItem('change_own_client_data','/register/client','New Client', <PersonAdd color={white} />, styleText)}

// TODO: Make css in a extern file
const muiTheme = getMuiTheme({
  drawer: {
    color: '#2E4155'
  },
});

const styleText = {
  color: 'white',
  textAlign: 'left',
  fontSize: 14
};

export default class SidebarMenu extends React.Component {

  render() {

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Drawer open={this.props.navDrawerOpen}>
            {makeMenuItem('allow_any','/',<h1>iRich</h1>,'',styleText)}
            {makeMenuItem('change_own_client_data','/register/steps',
              'Steps Client', <PersonAdd color={white} />, styleText)}
            {makeMenuItem('see_all_basic_client_data','/client','Client',
              <PersonAdd color={white} />, styleText)}
            {makeMenuItem('see_employee_data','/employee','Employee',
              <PersonAdd color={white} />,styleText)}
            {makeMenuItem('allow_any','/goals','Goal',
              <PersonAdd color={white} />,styleText)}
          </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

SidebarMenu.propTypes = {
  navDrawerOpen: PropTypes.bool.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
//import Divider from 'material-ui/Divider';
import makeMenuItem from '../utils/makeMenuItem';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {white} from 'material-ui/styles/colors';
import {Link} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import LogoutComponent from '../auth/LogoutComponent';
import {AuthorizedLink} from '../routes/Router';


//{makeMenuItem('change_own_client_data','/register/client','New Client', <PersonAdd color={white} />, styleText)}

// TODO: Make css in a extern file
//const muiTheme = getMuiTheme({
//  drawer: {
//    color: '#fE4155'
//  },
//});

const styleText = {
//  color: 'white',
//  textAlign: 'left',
//  fontSize: 14
};

export default class SidebarMenu extends React.Component {

  static propTypes = {
    navDrawerOpen: PropTypes.bool.isRequired,
    auth: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <Drawer open={this.props.navDrawerOpen}>
        {makeMenuItem('allow_any','/',<h1>DreamRich</h1>,'',styleText, 
          'MenuItem')}
        {makeMenuItem('change_own_client_data','/register/steps',
          'Steps Client', <PersonAdd color={white} />, styleText, 'MenuItem')}
        {makeMenuItem('see_all_basic_client_data','/client','Client',
          <PersonAdd color={white} />, styleText, 'MenuItem')}
        {makeMenuItem('see_employee_data','/employee','Employee',
          <PersonAdd color={white} />,styleText, 'MenuItem')}
        {makeMenuItem('allow_any','/goals','Goal',
          <PersonAdd color={white} />,styleText, 'MenuItem')}

        {!this.props.auth && <Link to='/login'>
          <MenuItem 
            className='MenuItem'
            leftIcon={<PersonAdd color={white} />}
            primaryText='Login'
          />
        </Link>
        }
        <AuthorizedLink permission='allow_any'
          to={{}}>
          <LogoutComponent 
            className='MenuItem'
            leftIcon={<PersonAdd color={white} />}
            primaryText='Sign out'
          />
        </AuthorizedLink>
      </Drawer>
    );
  }
}


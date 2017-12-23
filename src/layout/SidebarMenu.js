import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import makeMenuItem from '../utils/makeMenuItem';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import {white} from 'material-ui/styles/colors';
import {AuthorizedLink} from '../routes/Router';
import {List, ListItem} from 'material-ui/List';
import Dashboard from 'material-ui/svg-icons/action/dashboard';

export default class SidebarMenu extends React.Component {

  static propTypes = {
    navDrawerOpen: PropTypes.bool.isRequired,
    auth: PropTypes.bool.isRequired,
  }
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    return (
      <Drawer open={this.props.navDrawerOpen}>
        <List>
          {makeMenuItem('allow_any','/',<h1 className='centralized-text'>DreamRich</h1>,'',
            'MenuItem')}
          {makeMenuItem('change_own_client_data','/register/steps',
            'Steps Client', <PersonAdd color={white} />, 'MenuItem')}
          {makeMenuItem('see_all_basic_client_data','/client','Client',
            <Person color={white} />, 'MenuItem')}
          {this.props.auth && <ListItem
            primaryText="Employee"
            className='MenuItem'
            leftIcon={<PersonOutline color={white} />}
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            nestedItems={[
              <AuthorizedLink
                key={'dropdownLinkMenu'+2}
                permission='see_employee_data'
                to='/employee/common'
              >
                <ListItem
                  key={'dropdownLink'+1}
                  className='MenuItem'
                  primaryText="Common"
                  style={{marginLeft:'55px'}}
                />
              </AuthorizedLink>
              ,
              <AuthorizedLink
                key={'dropdownLinkMenu'+3}
                permission='see_employee_data'
                to='/employee/financial'
              >
                <ListItem
                  key={'dropdownLink'+2}
                  className='MenuItem'
                  primaryText="Financial"
                  style={{marginLeft:'55px'}}
                />
              </AuthorizedLink>
            ]}
          />
          }
          <AuthorizedLink
            permission='allow_any'
            to='/dashboard/8/'
          >
            <ListItem
              primaryText="Dashboard Client"
              className='MenuItem'
              leftIcon={<Dashboard color={white} />}
            />
          </AuthorizedLink>
        </List>
      </Drawer>
    );
  }
}


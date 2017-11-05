import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import makeMenuItem from '../utils/makeMenuItem';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import {white} from 'material-ui/styles/colors';
import {Link} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import {AuthorizedLink} from '../routes/Router';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentSend from 'material-ui/svg-icons/content/send';

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
        <List className='MenuItem'>
          {makeMenuItem('allow_any','/',<h1>DreamRich</h1>,'',
            'MenuItem')}
          {makeMenuItem('change_own_client_data','/register/steps',
            'Steps Client', <PersonAdd color={white} />, 'MenuItem')}
          {makeMenuItem('see_all_basic_client_data','/client','Client',
            <PersonAdd color={white} />, 'MenuItem')}
          {makeMenuItem('allow_any','/goals','Goal',
            <PersonAdd color={white} />, 'MenuItem')}
          {!this.props.auth && <Link to='/login'>
            <MenuItem
              className='MenuItem'
              leftIcon={<PersonAdd color={white} />}
              primaryText='Login'
            />
          </Link>
          }
          <AuthorizedLink
            permission='allow_any'
            to='/dashboard/16'
          >
            <ListItem
              primaryText="Dashboard Client"
              className='MenuItem'
              leftIcon={<ContentSend color={white} />}
            />
          </AuthorizedLink>
          <ListItem
            primaryText="Employee"
            className='MenuItem'
            leftIcon={<ContentInbox color={white} />}
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
                  leftIcon={<ContentInbox color={white} />}
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
                  leftIcon={<ContentInbox color={white} />}
                />
              </AuthorizedLink>
            ]}
          />
        </List>
      </Drawer>
    );
  }
}


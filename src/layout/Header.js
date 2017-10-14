import React from 'react';
import {Auth} from '../auth/Auth';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuStore from '../stores/MenuStore';
import MenuItem from 'material-ui/MenuItem';
import {white} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import makeMenuItem from '../utils/makeMenuItem';
import Menu from 'material-ui/svg-icons/navigation/menu';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// TODO: Make css in a extern file
const muiTheme = getMuiTheme({
  appBar: {
    color: '#2E4155'
  },
});

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      auth: false
    };
  }

  handleOpenMenu = () => {
    this.setState({
      openMenu: !this.state.openMenu,
    });
    console.log(this.state.openMenu);
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    });
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

    const {styles, handleChangeRequestNavDrawer} = this.props;

    const style = {
      appBar: {
        color: '#00cea5',
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 30
      },
      iconsRightContainer: {
        marginLeft: 30
      },
    };

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar
            style={{...styles, ...style.appBar}}
            iconElementLeft={
              <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                <Menu color={white} />
              </IconButton>
            }
            iconElementRight={
              <div onClick={this.handleOpenMenu}>
                <IconMenu styles={style.iconsRightContainer}
                  iconButtonElement={<IconButton iconStyle={{color:'white'}}><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  onRequestChange={this.handleOnRequestChange}
                  open={this.state.openMenu}
                >
                  <MenuItem>
                    { !this.state.auth && makeMenuItem('allow_any','/login/','Login')}
                    { this.state.auth && makeMenuItem('allow_any','/logout/','Sign out')}
                  </MenuItem>
                    {makeMenuItem('allow_any','/login/changepassword','Change Password')}
                </IconMenu>
              </div>
            }
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;

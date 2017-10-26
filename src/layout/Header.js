import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuStore from '../stores/MenuStore';
import MenuItem from 'material-ui/MenuItem';
import {white} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import makeMenuItem from '../utils/makeMenuItem';
import Menu from 'material-ui/svg-icons/navigation/menu';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';

// TODO: Make css in a extern file
// const muiTheme = getMuiTheme({
//   appBar: {
//     color: '#225'
//   },
// });

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = MenuStore.getState();
  }

  propTypes = {
    auth: PropTypes.bool,
    styles: PropTypes.object,
    handleChangeRequestNavDrawer: PropTypes.func
  }

  handleOnRequestChange = (value) => {
    AppDispatcher.dispatch({
      actionType: ActionType.MENU.REQUESTCHANGE,
      openMenu: value,
    });
  }

  handleUpdate = () => {
    this.setState(MenuStore.getState());
  }

  handleSigout = () => AppDispatcher.dispatch({
    actionType: ActionType.LOGOUT
  })

  componentWillMount = () => this.setState({updateId: MenuStore.addListener(this.handleUpdate) })

  componentWillUnmount = () => this.state.updateId.remove()

  render() {

    const {styles, handleChangeRequestNavDrawer, auth} = this.props;

    const style = {
      menuButton: {
        marginLeft: 30
      },
      iconsRightContainer: {
        marginLeft: 30
      },
    };

    const iconButton = <IconButton> <MoreVertIcon /> </IconButton>;

    return (
      <AppBar
        title="DreamRich"
        className='AppBar'
        style={styles}
        iconElementLeft={
          <div>
            <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
              <Menu color={white} />
            </IconButton>
          </div>
        }
        iconElementRight={
          <IconMenu
            styles={style.iconsRightContainer}
            iconButtonElement={iconButton}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            onRequestChange={this.handleOnRequestChange}
            open={this.state.openMenu}
          >
            <MenuItem>
              { !auth && makeMenuItem('allow_any','/login/','Login')}
              { auth && <MenuItem 
                primaryText={'Sign out'}
                onClick={this.handleSigout}
              /> }
            </MenuItem>
            {makeMenuItem('allow_any','/login/changepassword','Change Password')}
          </IconMenu>
        }
      />
    );
  }

}

export default Header;

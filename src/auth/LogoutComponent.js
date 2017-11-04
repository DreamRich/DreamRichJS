import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import {withRouter} from 'react-router';

// TODO: Make css in a extern file
// const muiTheme = getMuiTheme({
//   appBar: {
//     color: '#225'
//   },
// });

class LogoutComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.object,
  }

  handleSignout = () => {
    AppDispatcher.dispatch({
      action: ActionType.LOGOUT
    });
    this.props.history.push('/');
  }

  render() {

    const {match, location, history, staticContext, // eslint-disable-line no-unused-vars
      ...rest} = this.props;

    return (
      <MenuItem
        primaryText={'Sign out'}
        onClick={this.handleSignout}
        {...rest}
      />
    );
  }

}

export default withRouter(LogoutComponent);

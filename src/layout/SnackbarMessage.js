import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';

export default class SnackbarMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      open: this.props.open,
    };
  }

  static propTypes = {
    message: PropTypes.string,
    open: PropTypes.bool,
    handleRequestClose: PropTypes.func,
  }

  render() {
    return (
      <div>
        <Snackbar
          open={this.props.open}
          message={this.props.message}
          action="Ok"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.props.handleRequestClose}
          onRequestClose={this.props.handleRequestClose}
        />
      </div>
    );
  }
}

import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import getDivider from '../utils/getDivider';

export default class UploadFileModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        key='cancelButton'
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        key='submitButton'
        label="Submit"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Upload Files" onClick={this.handleOpen} />
        <Dialog
          title="Upload Files"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <RaisedButton containerElement='label' label='Documento de Identificação'>
            <input type="file" />
          </RaisedButton>
          {getDivider()}
          <RaisedButton containerElement='label' label='Comprovante de Residência'>
            <input type="file" />
          </RaisedButton>
        </Dialog>
      </div>
    );
  }
}

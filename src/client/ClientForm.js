import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import PropTypes from 'prop-types';
//import routeMap from '../routes/RouteMap';
import IconButton from 'material-ui/IconButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import Formsy from 'formsy-react';

export default class ClientForm extends Component {
  constructor(props){
    super(props);
  }

  submitForm = (data) => {
    console.log(data);
    AppDispatcher.dispatch({
      actionType: ActionType.CLIENT.ACTIVE,
      data: data
    });
  }

  submit = () => {console.log(this.form); this.form.submit();}

  render = () => {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Formsy.Form
          ref={(ref) => {this.form = ref; }}
          onValidSubmit={this.submitForm}>
          {this.props.children}
          <IconButton
            name="id_document"
            tooltip="Documento de Identificação"
            touch={true}
            tooltipPosition="top-left">
            <FileFileUpload />
          </IconButton>
          <IconButton
            name="proof_of_address"
            tooltip="Comprovante de Residência"
            touch={true}
            tooltipPosition="top-right">
            <FileFileUpload />
          </IconButton>
        </Formsy.Form>
      </div>
    );
  }
}

ClientForm.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.element,
};

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormsyText} from 'formsy-material-ui/lib';
import ClientSubForm from './ClientSubForm';
import errorMessages from '../utils/FormsErrorMessages';
import { Row, Col } from 'react-flexbox-grid';

var {
  numericError,
} = errorMessages;

export default class ClientBankAccountForm extends Component {
  constructor(props){
    super(props);
  }

  render = () => {
    return (
      <ClientSubForm
        name="bank_account"
        parent_name='active_client_id'
        parent_id={this.props.id}
      >
        <Row around="xs">
          <Col xs={2}>
            <div className='steps-title'>Conta Bancária</div>
          </Col>
          <Col xs={2}>
            <FormsyText
              name="agency"
              validations="isNumeric"
              validationError={numericError}
              hintText="Agência da conta bancária"
              floatingLabelText="Agência"
            />
          </Col>
          <Col xs={2}>
            <FormsyText
              name="account"
              hintText="Número da conta bancária"
              floatingLabelText="Conta"
            />
          </Col>
        </Row>
      </ClientSubForm>
    );
  }
}

ClientBankAccountForm.propTypes = {
  id: PropTypes.number,
};

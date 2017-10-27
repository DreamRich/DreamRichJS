import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormsyText} from 'formsy-material-ui/lib';
import ClientSubForm from './ClientSubForm';
import errorMessages from '../utils/FormsErrorMessages';
import { Row, Col } from 'react-flexbox-grid';
import CardForm from '../layout/CardForm';

var {
  numericError,
} = errorMessages;

export default class ClientBankAccountForm extends Component {
  constructor(props){
    super(props);
  }
  static propTypes = {
    id: PropTypes.number,
  }
  getContentCard(){
    return (
      <Row around="xs">
        <Col xs>
          <FormsyText
            name="agency"
            validations="isNumeric"
            validationError={numericError}
            hintText="Agência da conta bancária"
            floatingLabelText="Agência"
          />
        </Col>
        <Col xs>
          <FormsyText
            name="account"
            hintText="Número da conta bancária"
            floatingLabelText="Conta"
          />
        </Col>
      </Row>
    );
  }

  render = () => {
    return (
      <ClientSubForm
        name="bank_account"
        parent_name='active_client_id'
        parent_id={this.props.id}
      >
        <CardForm
          titleCard="Conta Bancária"
          subtitleCard="Insira as informações correspondentes a conta bancária."
          contentCard={this.getContentCard()}
        />
      </ClientSubForm>
    );
  }
}



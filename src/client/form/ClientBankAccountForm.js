import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormsyText} from 'formsy-material-ui/lib';
import SubForm from '../../components/SubForm';
import errorMessages from '../../utils/FormsErrorMessages';
import { Row, Col } from 'react-flexbox-grid';
import CardForm from '../../components/CardForm';
import ActionType from '../../actions/ActionType';

var {
  numericError,
} = errorMessages;

export default class ClientBankAccountForm extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    id: PropTypes.number,
    canSubmit: PropTypes.bool,
  }

  getContentCard(){
    return (
      <Row around="xs">
        <Col xs>
          <FormsyText
            name="agency"
            validations="isNumeric"
            validationError={numericError}
            hintText="Agência da conta bancária "
            floatingLabelText="Agência"
          />
        </Col>
        <Col xs>
          <FormsyText
            name="account"
            hintText="Número da conta bancária "
            floatingLabelText="Conta"
          />
        </Col>
      </Row>
    );
  }

  render = () => {
    return (
      <SubForm
        name="bank_account"
        parent_name='active_client_id'
        parent_id={this.props.id}
        canSubmit={this.props.canSubmit}
        action={ActionType.CLIENT.POSTFORM}
      >
        <CardForm
          titleCard="Conta Bancária"
          subtitleCard="Insira as informações correspondentes a conta bancária."
          contentCard={this.getContentCard()}
        />
      </SubForm>
    );
  }
}



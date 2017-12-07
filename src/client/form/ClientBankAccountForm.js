import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormsyText, FormsyToggle} from 'formsy-material-ui/lib';
import Form from '../../components/Form';
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
    isDisable: PropTypes.bool,
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
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
            value={this.props.data.agency}
            disabled={this.props.isDisable}
            fullWidth={true}
          />
        </Col>
        <Col xs>
          <FormsyText
            name="account"
            hintText="Número da conta bancária "
            floatingLabelText="Conta"
            value={this.props.data.account}
            disabled={this.props.isDisable}
            fullWidth={true}
          />
        </Col>
        <Col xs>
          <FormsyToggle
            name="joint_account"
            label="Conta conjunta?"
            toggled={this.props.data.joint_account}
            disabled={this.props.isDisable}
          />
        </Col>
      </Row>
    );
  }

  render = () => {
    return (
      <Form
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
      </Form>
    );
  }
}



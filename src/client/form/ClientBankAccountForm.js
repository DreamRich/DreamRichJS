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
  agencyError,
  maxLengthError,
  bankAccountError,
} = errorMessages;

export default class ClientBankAccountForm extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    id: PropTypes.number,
    canSubmit: PropTypes.bool,
    disabled: PropTypes.bool,
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
  }

  getContentCard = () => {
    return (
      <Form
        name="bank_account"
        parent_name='active_client_id'
        parent_id={this.props.id}
        canSubmit={this.props.canSubmit}
        action={ActionType.CLIENT.POSTFORM}
        disabled={this.props.disabled}
        isEditable
      >
        <Row around="xs">
          <Col xs>
            <FormsyText
              name="agency"
              validationError={numericError}
              validations={{matchRegexp: /\d{4}-?\d{1}/, isLength: 6}}
              validationErrors={{matchRegexp: agencyError, isLength: maxLengthError}}
              hintText="Agência da conta bancária "
              floatingLabelText="Agência"
              value={this.props.data.agency}
              fullWidth={true}
            />
          </Col>
          <Col xs>
            <FormsyText
              name="account"
              hintText="Número da conta bancária "
              validations={{matchRegexp: /\d{5}-?\d{1}/, isLength: 7}}
              validationErrors={{matchRegexp: bankAccountError, isLength: maxLengthError}}
              floatingLabelText="Conta"
              value={this.props.data.account}
              fullWidth={true}
            />
          </Col>
          <Col xs>
            <FormsyToggle
              name="joint_account"
              label="Conta conjunta?"
              value={this.props.data.joint_account}
            />
          </Col>
        </Row>
      </Form>
    );
  }

  render = () => {
    return (
      <CardForm
        titleCard="Conta Bancária"
        subtitleCard="Insira as informações correspondentes a conta bancária."
        contentCard={this.getContentCard()}
      />
    );
  }
}



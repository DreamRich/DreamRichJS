import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from '../../components/Form';
import CardForm from '../../components/CardForm';
import { Row, Col } from 'react-flexbox-grid';
import {FormsyText} from 'formsy-material-ui/lib';
import errorMessages from '../../utils/FormsErrorMessages';
import ActionType from '../../actions/ActionType';

var {
  numericError,
} = errorMessages;

export default class ReserveInLackForm extends Component {

  static propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    canSubmit: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  getContentCard = () => {
    return (
      <Form
        name='reserve_in_lack'
        parent_name='protection_manager_id'
        parent_id={this.props.id}
        canSubmit={this.props.canSubmit}
        disabled={this.props.disabled}
        action={ActionType.PROTECTION.POSTFORM}
        isEditable
      >
        <Row around='xs'>
          <Col xs>
            <FormsyText
              name='value_0_to_24_mounth'
              validations='isNumeric'
              validationError={numericError}
              hintText='Valor entre mês 0 e 24'
              floatingLabelText='Mês 0 a 24'
              value={this.props.data.value_0_to_24_mounth}
            />
          </Col>
          <Col xs>
            <FormsyText
              name='value_24_to_60_mounth'
              validations='isNumeric'
              validationError={numericError}
              hintText='Valor entre mês 24 e 60'
              floatingLabelText='Mês 24 a 60'
              value={this.props.data.value_24_to_60_mounth}
            />
          </Col>
          <Col xs>
            <FormsyText
              name='value_60_to_120_mounth'
              validations='isNumeric'
              validationError={numericError}
              hintText='Valor entre mês 60 e 120'
              floatingLabelText='Mês 60 a 120'
              value={this.props.data.value_60_to_120_mounth}
            />
          </Col>
          <Col xs>
            <FormsyText
              name='value_120_to_240_mounth'
              validations='isNumeric'
              validationError={numericError}
              hintText='Valor entre mês 120 e 240'
              floatingLabelText='Mês 120 a 240'
              value={this.props.data.value_120_to_240_mounth}
            />
          </Col>
        </Row>
      </Form>
    );
  }

  render = () => {
    return (
      <CardForm
        titleCard='Patrimônio para família'
        contentCard={this.getContentCard()}
      />);
  }
}

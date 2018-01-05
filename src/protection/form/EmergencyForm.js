import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from '../../components/Form';
import CardForm from '../../components/CardForm';
import ActionType from '../../actions/ActionType';
import RegularCostStore from '../../stores/RegularCostStore';
import PatrimonyStore from '../../stores/PatrimonyStore';
import { Row, Col } from 'react-flexbox-grid';
import {FormsyText} from 'formsy-material-ui/lib';
import errorMessages from '../../utils/FormsErrorMessages';

var {
  numericError,
} = errorMessages;

export default class EmergencyForm extends Component {

  static propTypes = {
    data: PropTypes.object,
  }

  onSubmit = (data) => {
    const {manager} = RegularCostStore.getState();
    const {patrimony} = PatrimonyStore.getState();
    data['cost_manager_id'] = manager.id;
    data['patrimony_id'] = patrimony.id;
  }

  getContentCard = () => {
    const disabled = this.props.data !== undefined &&
      this.props.data.id !== undefined;
    return (
      <Form
        name='emergency_reserve'
        disabled={disabled}
        action={ActionType.PROTECTION.POSTFORM}
        onSubmit={this.onSubmit}
        isEditable
      >
        <Row around='xs'>
          <Col xs>
            <FormsyText
              name='mounth_of_protection'
              validations='isNumeric'
              validationError={numericError}
              hintText='Meses que deseja ser protegido'
              floatingLabelText='Meses de proteção'
              value={this.props.data.mounth_of_protection}
            />
          </Col>
        </Row>
      </Form>
    );
  }

  render = () => {
    return (
      <CardForm
        titleCard='Reserva de emergência'
        subtitleCard='Por quanto tempo quer estar protegido, enquanto estiver sem renda'
        contentCard={this.getContentCard()}
      />
    );
  }

}

import React, {Component} from 'react';
// import SubForm from '../components/SubForm.js';
import ActionType from '../actions/ActionType.js';
import PropTypes from 'prop-types';
import {FormsyText, FormsySelect, /*FormsyCheckbox, FormsyDate*/} from 'formsy-material-ui/lib';
// import FormsyToggleYesNo from '../components/FormsyToggleYesNo';
// import CardForm from '../components/CardForm';
import ExtraSubForm from './ExtraSubForm';
import { Row, Col } from 'react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';

export default class ArrearangeSubForm extends Component {

  static propTypes = {
    parent_id: PropTypes.number,
    data: PropTypes.object,
    index: PropTypes.number,
    canSubmit: PropTypes.bool,
  }

  render = () => {
    return(

      <ExtraSubForm
        title="Dívidas"
        parent_id={this.props.parent_id}
        parent_name="patrimony_id"
        name="arrearanges"
        data={this.props.data}
        action={ActionType.PATRIMONY.POSTMULTIFORM}
        canSubmit={this.props.canSubmit}
        index={this.props.index}
      >
        <Row around='xs'>
          <Col xs>
            <FormsyText
              name='rate'
              floatingLabelText='Taxa'
              hintText='Taxa de juros'
              value={this.props.data.rate}
            />
          </Col>
          <Col xs>
            <FormsyText
              name='period'
              floatingLabelText='Tempo financiamento'
              hintText='Tempo do financiamento em meses'
              value={this.props.data.period}
            />
          </Col>
          <Col xs>
            <FormsySelect
              name="amortization_system"
              floatingLabelText="Sistema de amortização"
              maxHeight={300}
              value={this.props.data.amortization_system}
            >
              <MenuItem key={1} value='SAC' primaryText='SAC' />
              <MenuItem key={2} value='PRICE' primaryText='PRICE' />
            </FormsySelect>
          </Col>
        </Row>
      </ExtraSubForm>
    );
  }

}

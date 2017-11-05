import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormsyToggleYesNo from '../components/FormsyToggleYesNo';
import ExtraSubForm from './ExtraSubForm';
import { Row, Col } from 'react-flexbox-grid';

export default class RealeStateSubForm extends Component {

  static propTypes = {
    parent_id: PropTypes.number,
    data: PropTypes.object,
    index: PropTypes.number,
    canSubmit: PropTypes.bool,
  }

  render = () => {
    return(
      <ExtraSubForm
        {...this.props}
        name='realestates'
        title='Bens imóveis'
      >
        <Row around="xs">
          <Col xs>
            <FormsyToggleYesNo
              name="salable"
              label="É vendavel?"
              labelPosition='left'
              value={this.props.data.salable}
            />
          </Col>
        </Row>
      </ExtraSubForm>
    );
  }
}


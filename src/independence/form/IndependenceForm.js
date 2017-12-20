import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardForm from '../../components/CardForm';
import Form from '../../components/Form';
import errorMessages from '../../utils/FormsErrorMessages';
import makeFormysTextList from '../../utils/MakeFormysTextList';
import MediaQuery from 'react-responsive';
import { Row, Col } from 'react-flexbox-grid';
import ActionType from '../../actions/ActionType';
import IndependenceStore from '../../stores/IndependenceStore';

var {
  numericError,
} = errorMessages;

export default class IndependenceForm extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
  }

  fields = [
    {
      name: 'age', validations: 'isNumeric', validationError: numericError,
      hintText: 'Idade da aposentadoria', floatingLabelText: 'Idade da aposentadoria',
    },
    {
      name: 'duration_of_usufruct', validations: 'isNumeric', validationError: numericError,
      hintText: 'Duração de usufruto da aposentadoria', floatingLabelText: 'Tempo de usufruto',
    },
    {
      name: 'rate', validations: 'isNumeric', validationError: numericError,
      hintText: 'Taxa', floatingLabelText: 'Taxa',
    },
    {
      name: 'remain_patrimony', validations: 'isNumeric',
      validationError: numericError, floatingLabelText: 'Salário mensal',
      hintText: 'Valor recebido mensalmente da aposentadoria',
    }
  ]

  componentWillMount = () => this.setState({
    ...IndependenceStore.getState(),
    listener: IndependenceStore.addListener(this.handleChange),
  })

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState({...IndependenceStore.getState()})

  getContentCard = () => {
    const formsyList = makeFormysTextList(
      this.fields, 'independenceform', this.state.financialIndependence, this.props.disabled
    );

    return (
      <Form
        name='financial_independence'
        action={ActionType.INDEPENDENCE.SUBMIT}
        disabled={this.props.disabled}
        isEditable
      >
        <div>
          <MediaQuery key="desktopClientForm" query="(min-width: 1030px)">
            <Row around="xs">
              <Col key="firstColumnClientForm" xs>
                {formsyList.slice(0,2)}
              </Col>
              <Col key="secondColumnClientForm" xs>
                {formsyList.slice(2,4)}
              </Col>
            </Row>
          </MediaQuery>
          <MediaQuery key="mobileClientForm" query="(max-width: 1030px)">
            {formsyList}
          </MediaQuery>
        </div>
      </Form>
    );
  }

  render = () => {
    return (
      <CardForm
        titleCard='Independencia financeira'
        subtitleCard='Independencia financeira desejada até a aposentadoria'
        contentCard={this.getContentCard()}
      />
    );
  }
}

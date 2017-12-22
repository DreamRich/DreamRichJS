import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardForm from '../../components/CardForm';
import Form from '../../components/Form';
import errorMessages from '../../utils/FormsErrorMessages';
import makeFormysTextList from '../../utils/MakeFormysTextList';
import MediaQuery from 'react-responsive';
import { Row, Col } from 'react-flexbox-grid';
import ActionType from '../../actions/ActionType';
import RegisterStore from '../../stores/RegisterStore';

var {
  numericError,
} = errorMessages;

export default class PlanningForm extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
  }

  fields = [
    {
      name: 'cdi', validations: {isNumeric: 'true'}, validationErrors: {isNumeric: numericError},
      hintText: 'Taxa atual do CDI', floatingLabelText: 'Taxa CDI (%)'
    },
    {
      name: 'ipca', validations: {isNumeric: 'true'}, validationErrors: {isNumeric: numericError},
      hintText: 'Inflação média a ser considerada', floatingLabelText: 'Inflação - IPCA(%)',
    },
    {
      name: 'target_profitability', validations: {isNumeric: 'true'}, validationErrors: {isNumeric: numericError},
      hintText: 'Taxa em relação a porcentagem do CDI desejada', floatingLabelText: 'Taxa %CDI alvo',
    }
  ]

  componentWillMount = () => this.setState({
    ...RegisterStore.getState(),
    listener: RegisterStore.addListener(this.handleChange),
  })

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState({...RegisterStore.getState()})

  getContentCard = () => {
    const formsyList = makeFormysTextList(
      this.fields, 'planningform', this.state.financialPlanning, this.props.disabled
    );

    return (
      <Form
        name='financial_planning'
        action={ActionType.REGISTER.SUBMIT}
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
                {formsyList.slice(2,3)}
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
        titleCard='Planejamento'
        subtitleCard='Dados necessário para realizar o planejamento financeiro'
        contentCard={this.getContentCard()}
      />
    );
  }
}

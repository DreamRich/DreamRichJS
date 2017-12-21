import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from '../../components/Form';
import CardForm from '../../components/CardForm';
import ActionType from '../../actions/ActionType';
import {FormsyText} from 'formsy-material-ui/lib';
import { Row, Col } from 'react-flexbox-grid';
import errorMessages from '../../utils/FormsErrorMessages';
import MediaQuery from 'react-responsive';

var {
  numericError,
} = errorMessages;

const GenericSuccessionForm = (name, title, subTitle) => {
  return class SuccessionForm extends Component {
    static propTypes = {
      id: PropTypes.number,
      canSubmit: PropTypes.bool,
      disabled: PropTypes.bool,
      data: PropTypes.object,
    }

    getContentCard = () => {
      return (
        <Form
          name={name}
          parent_name='protection_manager_id'
          parent_id={this.props.id}
          canSubmit={this.props.canSubmit}
          action={ActionType.PROTECTION.POSTFORM}
          disabled={this.props.disabled}
          isEditable
        >
          <Row around='xs'>
            <Col xs>
              <FormsyText
                name='itcmd_tax'
                validations='isNumeric'
                validationError={numericError}
                hintText='Valor pago para o cartório'
                floatingLabelText='Taxa ITCMD'
                value={this.props.data.itcmd_tax}
                fullWidth={true}
              />
            </Col>
          </Row>
          <Row around='xs'>
            <Col xs>
              <FormsyText
                name='oab_tax'
                hintText='Valor pago ao advogado'
                floatingLabelText='Taxa advogado'
                value={this.props.data.oab_tax}
                fullWidth={true}
              />
            </Col>
          </Row>
          <Row around='xs'>
            <Col xs>
              <FormsyText
                name='other_taxes'
                hintText='Outros custos de sucessão'
                floatingLabelText='Taxas extras'
                value={this.props.data.other_taxes}
                fullWidth={true}
              />
            </Col>
          </Row>
        </Form>
      );
    }

    render = () => {
      return (
        <CardForm
          titleCard={title}
          subtitleCard={subTitle}
          contentCard={this.getContentCard()}
        />
      );
    }
  };
};

const ActualPatrimonySuccessionForm = GenericSuccessionForm(
  'actual_patrimony_succession',
  'Custo de sucessão hoje',
  'Este são os custos para sucessão hoje');
const FuturePatrimonySuccessionForm = GenericSuccessionForm(
  'future_patrimony_succession',
  'Custo de sucessão no futuro',
  'Este são os custos para sucessão no futuro');

export {ActualPatrimonySuccessionForm, FuturePatrimonySuccessionForm};

export default class SuccessionForm extends Component {

  static propTypes = {
    actual: PropTypes.object,
    future: PropTypes.object,
  }

  render = () => {
    const {actual, future, ...rest} = this.props;
    return (
      <div>
        <MediaQuery key="desktopForm" query="(min-width: 1030px)">
          <Row>
            <Col xs={6}>
              <ActualPatrimonySuccessionForm data={actual} {...rest} />
            </Col>
            <Col xs={6}>
              <FuturePatrimonySuccessionForm data={future} {...rest} />
            </Col>
          </Row>
        </MediaQuery>
        <MediaQuery key="mobileForm" query="(max-width: 1030px)">
          <ActualPatrimonySuccessionForm data={actual} {...rest} />
          <FuturePatrimonySuccessionForm data={future} {...rest} />
        </MediaQuery>
      </div>
    );
  }

}

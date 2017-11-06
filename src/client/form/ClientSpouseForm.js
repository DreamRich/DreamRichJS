import React, {Component} from 'react';
// import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
// import errorMessages from '../utils/FormsErrorMessages';
import SubForm from '../../components/SubForm';
import FormsyDate from '../../utils/formsyComponents/FormsyDate';
import PropTypes from 'prop-types';
import makeFormysTextList from '../../utils/MakeFormysTextList';
import CardForm from '../../components/CardForm';
import { Row, Col } from 'react-flexbox-grid';
import ActionType from '../../actions/ActionType';
import {personFields} from './ClientForm';
import MediaQuery from 'react-responsive';

export default class SpouseForm extends Component {

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    subtitleCard: PropTypes.string,
    canSubmit: PropTypes.bool,
    data: PropTypes.object,
    isDisable: PropTypes.bool,
  }

  getFormsyDate(){
    return (
      <FormsyDate
        name="birthday"
        floatingLabelText="Data de Nascimento"
        value={this.props.data.birthday}
        isFormDisabled={this.props.isDisable}
      />
    );
  }

  getContentCard(){
    const spouseFields = personFields.filter( field => field.name !== 'email');
    // This form use the same field as client form
    const formsyList = makeFormysTextList(
      spouseFields,'spouseform', this.props.data, this.props.isDisable
    );

    return (
      <div>
        <MediaQuery query="(min-width: 1030px)">
          <Row around="xs">
            <Col xs>
              {formsyList.slice(0,3)}
            </Col>
            <Col xs>
              {formsyList.slice(3,6)}
            </Col>
            <Col xs>
              {this.getFormsyDate()}
            </Col>
          </Row>
        </MediaQuery>
        <MediaQuery query="(max-width: 1030px)">
          {formsyList}
          {this.getFormsyDate()}
        </MediaQuery>
      </div>
    );
  }

  render(){
    return (
      <SubForm
        name="spouse"
        parent_name="active_client_id"
        parent_id={this.props.id}
        action={ActionType.CLIENT.POSTFORM}
        canSubmit={this.props.canSubmit}
      >
        <CardForm
          titleCard={this.props.title}
          subtitleCard={this.props.subtitleCard}
          contentCard={this.getContentCard()}
        />
      </SubForm>
    );
  }
}

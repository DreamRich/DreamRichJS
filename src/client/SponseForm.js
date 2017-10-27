import React, {Component} from 'react';
// import IconButton from 'material-ui/IconButton';
// import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
// import errorMessages from '../utils/FormsErrorMessages';
import { Row, Col } from 'react-flexbox-grid';
import ClientSubForm from './ClientSubForm';
import FormsyDate from '../utils/formsyComponents/FormsyDate';
import PropTypes from 'prop-types';
import makeFormysTextList from '../utils/MakeFormysTextList';
import CardForm from '../layout/CardForm';
// import Checkbox from 'material-ui/Checkbox';
import ActionType from '../actions/ActionType';
import {personData} from './ClientForm';

// var {
//   wordsError,
//   numericError,
//   emailError,
// } = errorMessages;

export default class SponseForm extends Component {

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    subtitleCard: PropTypes.string,
    canSubmit: PropTypes.bool,
  }

  getContentCard(){
    const formsyList = makeFormysTextList(personData,'clientform');

    return (
      <Row around="xs">
        <Col xs>
          {formsyList.slice(0,3)}
        </Col>
        <Col xs>
          {formsyList.slice(3,6)}
        </Col>
        <Col xs>
          {formsyList.slice(6,8)}
          <FormsyDate
            name="birthday"
            floatingLabelText="Data de Nascimento"
          />
        </Col>
      </Row>
    );
  }

  render(){
    return (
      <ClientSubForm
        name="client"
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
      </ClientSubForm>
    );
  }
}

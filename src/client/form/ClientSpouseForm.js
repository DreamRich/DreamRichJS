import React, {Component} from 'react';
// import IconButton from 'material-ui/IconButton';
// import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
// import errorMessages from '../utils/FormsErrorMessages';
import { Row } from 'react-flexbox-grid';
import SubForm from '../../components/SubForm';
import FormsyDate from '../../utils/formsyComponents/FormsyDate';
import PropTypes from 'prop-types';
import makeFormysTextList from '../../utils/MakeFormysTextList';
import CardForm from '../../components/CardForm';
// import Checkbox from 'material-ui/Checkbox';
import ActionType from '../../actions/ActionType';
import {personFields} from './ClientForm';

// var {
//   wordsError,
//   numericError,
//   emailError,
// } = errorMessages;

export default class SpouseForm extends Component {

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    subtitleCard: PropTypes.string,
    canSubmit: PropTypes.bool,
    data: PropTypes.object,
  }

  getContentCard(){
    const spouseFields = personFields.filter( field => field.name !== 'email');
    // This form use the same field as client form
    const formsyList = makeFormysTextList(
      spouseFields,'spouseform', this.props.data
    );

    return (
      <Row around="xs">
        {formsyList}
        <FormsyDate
          name="birthday"
          floatingLabelText="Data de Nascimento"
          value={this.props.data.birthday}
        />
      </Row>
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

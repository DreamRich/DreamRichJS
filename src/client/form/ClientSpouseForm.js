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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



export default class SpouseForm extends Component {


  constructor(props){
    super(props);

    this.state = {
      isDisable: this.props.isDisable,
    };

    this.changeStateDisable = this.changeStateDisable.bind(this);

  }

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
        isFormDisabled={this.state.isDisable}
      />
    );
  }

  getAddSponse(){
    return (
      <Row around="xs">
        <FloatingActionButton key='0' onClick={this.changeStateDisable} >
          <ContentAdd />
        </FloatingActionButton>
      </Row>
    );
  }

  changeStateDisable(){
    this.setState({isDisable: !this.state.isDisable});
  }

  getContentCard(){
    const spouseFields = personFields.filter( field => field.name !== 'email');
    // This form use the same field as client form
    const formsyList = makeFormysTextList(
      spouseFields,'spouseform', this.props.data, this.state.isDisable
    );

    if(Object.keys(this.props.data).length == 0 && this.state.isDisable) {
      return this.getAddSponse();
    } else{
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

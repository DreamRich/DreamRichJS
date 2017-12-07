import React, {Component} from 'react';
import Form from '../../components/Form';
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
  }

  state = {
    disabled: true
  }

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    subtitleCard: PropTypes.string,
    canSubmit: PropTypes.bool,
    data: PropTypes.object,
    disabled: PropTypes.bool,
  }

  getFormsyDate(){
    return (
      <FormsyDate
        name="birthday"
        floatingLabelText="Data de Nascimento"
        value={this.props.data.birthday}
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

  changeStateDisable = () => {
    this.setState({disabled: !this.state.disabled});
  }

  getContentCard(){
    const spouseFields = personFields.filter( field => field.name !== 'email');
    // This form use the same field as client form
    const formsyList = makeFormysTextList(
      spouseFields,'spouseform', this.props.data, this.state.disabled
    );

    if(Object.keys(this.props.data).length == 0 && this.state.disabled) {
      return this.getAddSponse();
    } else{
      return (
        <Form
          name="spouse"
          parent_name="active_spouse_id"
          parent_id={this.props.id}
          action={ActionType.CLIENT.POSTFORM}
          canSubmit={this.props.canSubmit}
          disabled={this.props.disabled}
          isEditable
        >
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
        </Form>
      );
    }
  }

  render(){
    return (
      <CardForm
        titleCard={this.props.title}
        subtitleCard={this.props.subtitleCard}
        contentCard={this.getContentCard()}
      />
    );
  }
}

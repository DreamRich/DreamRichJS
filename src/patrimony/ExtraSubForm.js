import React, {Component} from 'react';
import SubForm from '../components/SubForm.js';
import ActionType from '../actions/ActionType.js';
import PropTypes from 'prop-types';
import {FormsyText , /*FormsyCheckbox, FormsyDate*/} from 'formsy-material-ui/lib';
import CardForm from '../components/CardForm';
import { Row, Col } from 'react-flexbox-grid';

export default class ExtraSubForm extends Component {

  static propTypes = {
    parent_id: PropTypes.number,
    title: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.object,
    index: PropTypes.number,
    children: PropTypes.element,
    canSubmit: PropTypes.bool,
  }

  getContentCard = () => (<div>
    <Row around="xs">
      <Col xs>
        <FormsyText
          name="name"
          floatingLabelText="Nome"
          hintText="Nome do patrimonio"
          value={this.props.data.name}
        />
      </Col>
      <Col xs>
        <FormsyText
          name="value"
          floatingLabelText="Valor"
          hintText="Valor do patrimônio"
          value={this.props.data.value}
        />
      </Col>
    </Row>
    {this.props.children}
  </div>
  )

  render = () => {
    return(
      <SubForm
        title={this.props.title}
        parent_id={this.props.parent_id}
        parent_name="patrimony_id"
        name={this.props.name}
        action={ActionType.PATRIMONY.POSTMULTIFORM}
        canSubmit={this.props.canSubmit}
        index={this.props.index}
      >
        <CardForm
          titleCard={this.props.title}
          subtitleCard='Insira as informações abaixo'
          contentCard={this.getContentCard()}
        />
      </SubForm>
    );
  }
}

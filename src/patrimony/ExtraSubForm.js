import React, {Component} from 'react';
import SubForm from '../components/SubForm.js';
import ActionType from '../actions/ActionType.js';
import PropTypes from 'prop-types';
import {FormsyText , /*FormsyCheckbox, FormsyDate*/} from 'formsy-material-ui/lib';

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

  render = () => {
    return(
      <SubForm
        title={this.props.title}
        parent_id={this.props.parent_id}
        parent_name="patrimony_id"
        name={this.props.name}
        action={ActionType.PATRIMONY.POSTMULTIFORM}
        canSubmit={this.props.canSubmit}
      >
        <div>
          <FormsyText
            name="name"
            floatingLabelText="Nome"
            hintText="Nome do patrimonio"
            value={this.props.data.name}
          />
          <FormsyText
            name="value"
            floatingLabelText="Valor"
            hintText="Valor do patrimônio"
            value={this.props.data.value}
          />
          {this.props.children}
        </div>
      </SubForm>
    );
  }
}

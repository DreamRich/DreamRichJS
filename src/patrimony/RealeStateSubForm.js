import React, {Component} from 'react';
import ClientSubForm from '../client/ClientSubForm.js';
import ActionType from '../actions/ActionType.js';
import PropTypes from 'prop-types';

export default class RealeStateSubForm extends Component {

  render = () => {
    return(
      <ClientSubForm
        title="Bens imobiliários"
        parent_id={this.props.parent_id}
        parent_name="patrimony_id"
        name="realestate"
        action={ActionType.PATRIMONY.SUBFORM}
      />
    );
  }
}

RealeStateSubForm.propTypes = {
  parent_id: PropTypes.number
};

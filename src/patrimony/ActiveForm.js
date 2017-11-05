import React, {Component} from 'react';
import ActiveSubForm from './ActiveSubForm';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
// import ActiveStore from '../stores/ActiveStore';
// import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
// import RaisedButton from 'material-ui/RaisedButton';
import MultiForm from './MultiForm';
import PatrimonyStore from '../stores/PatrimonyStore';
import {getActiveTypes} from '../resources/getFormData';

const ActiveMultiForm = MultiForm(ActiveSubForm);

export default class ActiveForm extends Component {

  static propTypes = {
    parent_id: PropTypes.number,
    manager: PropTypes.object,
    data: PropTypes.array,
    canSubmit: PropTypes.bool,
    types: PropTypes.array,
  }

  componentWillMount = () => {
    const {types} = PatrimonyStore.getState();
    console.log(!types, types.length === 0);
    console.log(types);
    if (!types || types.length === 0) {
      getActiveTypes();
    } else {
      console.log('ok');
    }
  }

  submitBase = () => {
    AppDispatcher.dispatch({
      action: ActionType.ACTIVE.MANAGER,
      data: {patrimony_id: this.props.parent_id}
    });
  }

  render = () => {
    return (
      <ActiveMultiForm
        parent_id={this.props.manager.id}
        name='actives'
        title='Ativos'
        labelAdd='Possui ativos? (Marque o quadrado ao lado)'
        labelAdded='Possui outro ativo? (Marque o quadrado ao lado)'
        labelRemove='Possuo este ativo.'
        data={this.props.data}
        canSubmit={this.props.canSubmit}
        types={this.props.types}
      />
    );
  }

}


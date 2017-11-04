import React, {Component} from 'react';
import IncomeSubForm from './IncomeSubForm';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import PropTypes from 'prop-types';
import getSelectOption from '../utils/getSelectOption';

export default class IncomeForm extends Component {

  static propTypes = {
    parent_id: PropTypes.number,
    data: PropTypes.array,
    canSubmit: PropTypes.bool,
  }

  addIncome = () => {
    AppDispatcher.dispatch({
      action: ActionType.PATRIMONY.ADD,
      state: 'income',
    });
  }

  removeIncome = (index) => {
    AppDispatcher.dispatch({
      action: ActionType.PATRIMONY.REMOVE,
      index: index,
      state: 'income',
    });
  }

  render = () => {
    const labelRemove = 'Tenho esta renda?';
    const labelAdd = (this.props.data.length === 0 ?
      'Possui uma renda? (Marque o quadrado ao lado caso haja).' :
      'Possui outra fonte de renda? (Marque o quadrado ao lado caso haja).');
    return (
      <div>
        {this.props.data.map( income => {
          return (
            <div  key={income.index}>
              {getSelectOption(
                this.removeIncome.bind(this, income.index), true, labelRemove)
              }
              <IncomeSubForm
                parent_id={this.props.parent_id}
                data={income}
                index={income.index}
                canSubmit={this.props.canSubmit}
              />
            </div>
          );
        })
        }
        {getSelectOption(this.addIncome, false, labelAdd)}
      </div>
    );
  }
}


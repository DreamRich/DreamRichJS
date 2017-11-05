import React, {Component} from 'react';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import PropTypes from 'prop-types';
import getSelectOption from '../utils/getSelectOption';

const multiFormHOC = (SubForm) => class MultiForm extends Component {
    static propTypes = {
      parent_id: PropTypes.number,
      data: PropTypes.array,
      canSubmit: PropTypes.bool,
      labelRemove: PropTypes.string,
      labelAdd: PropTypes.string,
      labelAdded: PropTypes.string,
      name: PropTypes.string,
    }

    addIncome = () => {
      AppDispatcher.dispatch({
        action: ActionType.PATRIMONY.ADD,
        state: this.props.name,
      });
    }

    removeIncome = (index) => {
      AppDispatcher.dispatch({
        action: ActionType.PATRIMONY.REMOVE,
        index: index,
        state: this.props.name,
      });
    }

    render = () => {
      const { labelRemove, labelAdd, labelAdded, ...rest } = this.props;
      const label = (this.props.data.length === 0 ? labelAdd : labelAdded);
      return (
        <div>
          {this.props.data.map( item => {
            return (
              <div key={item.index}>
                {getSelectOption(
                  this.removeIncome.bind(this, item.index), true, labelRemove)
                }
                <SubForm
                  {...rest}
                  data={item}
                  index={item.index}
                />
              </div>
            );
          })
          }
          {getSelectOption(this.addIncome, false, label)}
        </div>
      );
    }
};

export default multiFormHOC;

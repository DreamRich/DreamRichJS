import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EmergencySituation from './EmergencySituation';
import EmergencyForm from './form/EmergencyForm';


export default class EmergencyInformation extends Component {

  static propTypes = {
    data: PropTypes.object,
  }

  render = () => {
    return (
      <div>
        <EmergencySituation
          necessery_value={this.props.data.necessery_value}
          risk_gap={this.props.data.risk_gap}
        />
        <EmergencyForm {...this.props} />
      </div>
    );
  }
}

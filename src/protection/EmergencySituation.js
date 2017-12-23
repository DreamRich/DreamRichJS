import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import formatCurrency from '../utils/currency';

export default class EmergencySituation extends Component {

  static propTypes = {
    necessery_value: PropTypes.number,
    risk_gap: PropTypes.number,
  }

  render = () => {
    const classRisk = this.props.risk_gap > 0 ?
      'EmergencyRisk' : 'EmergencyNoRisk';
    const necessery = formatCurrency(this.props.necessery_value || 0);
    const risk_gap = formatCurrency(this.props.risk_gap || 0);

    return (
      <Paper>
        <Row around='xs' className='Emergency'>
          <Col xs={6} className='LabelPatrimony'>
            <label>Valor necessário para proteção</label>
          </Col>
          <Col xs={6} className='LabelPatrimony'>
            <label>Quantia que falta para proteção</label> 
          </Col>
        </Row>
        <Row around='xs' className='Emergency'>
          <Col xs={6} className='LabelPatrimony'>
            <div className={classRisk}>R$: {necessery}</div>
          </Col>
          <Col xs={6} className='LabelPatrimony'>
            <div className={classRisk} >R$: {risk_gap} </div>
          </Col>
        </Row>
      </Paper>
    );
  }
}

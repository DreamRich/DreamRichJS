import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import formatCurrency from '../utils/currency';
import {Card, CardTitle, CardText} from 'material-ui/Card';

export default class SuccessionSituation extends Component {

  static propTypes = {
    reserve: PropTypes.object,
    actual: PropTypes.object,
    future: PropTypes.object,
  }

  render = () => {
    const futureCSS = this.props.future.need_for_vialicia > 0 ? 'EmergencyNoRisk':'EmergencyRisk';
    const actualCSS = this.props.actual.need_for_vialicia > 0 ? 'EmergencyNoRisk':'EmergencyRisk';

    return (
      <Card>
        <CardTitle
          title='Patrimônio para família'
        />
        <CardText>
          <Row around='xs'>
            <Col xs={6} className='LabelPatrimony'>
              <label>Proteção para família</label>
            </Col>
            <Col xs={3} className='LabelPatrimony'>
              {formatCurrency(this.props.reserve.patrimony_necessery_total)}
            </Col>
          </Row>
        </CardText>
        <CardTitle
          title='Patrimônio após sucessão'
        />
        <CardText>
          <Row around='xs'>
            <Col xs={6}>
            </Col>
            <Col xs={3}>
              Actual
            </Col>
            <Col xs={3}>
              Futuro
            </Col>
          </Row>
          <Row around='xs'>
            <Col xs={6} className='LabelPatrimony'>
              <label>Patrimônio R$</label>
            </Col>
            <Col xs={3} className='LabelPatrimony'>
              <div className={actualCSS}>
                {formatCurrency(this.props.actual.need_for_vialicia)}
              </div>
            </Col>
            <Col xs={3} className='LabelPatrimony'>
              <div className={futureCSS}>
                {formatCurrency(this.props.future.need_for_vialicia)}
              </div>
            </Col>
          </Row>
        </CardText>
      </Card>
    );
  }
}

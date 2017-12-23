import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import formatCurrency from '../utils/currency';
import Divider from 'material-ui/Divider';
import {Card, CardTitle, CardText} from 'material-ui/Card';

export default class SuccessionValue extends Component {

  static propTypes = {
    data: PropTypes.object,
    labels: PropTypes.array,
    itens: PropTypes.array,
    title: PropTypes.string,
  }

  getSum = (itens, labels) => {

    const {data: {actual, future} } = this.props;
    return itens.map( (item, index) => {
      let values = null;
      if (index == itens.length-1) {
        values = <Row around='xs'>
          <Col xs={6}><Divider /></Col>
          <Col xs={3}><Divider /></Col>
          <Col xs={3}><Divider /></Col>
        </Row>;
      }

      return (
        <div key={index} >
          {values}
          <Row around='xs'>
            <Col xs={6} className='LabelPatrimony'>
              <label>{labels[index]} R$</label>
            </Col>
            <Col xs={3}>
              {formatCurrency(actual[item])}
            </Col>
            <Col xs={3}>
              {formatCurrency(future[item])}
            </Col>
          </Row>
        </div>);
    });
  }

  render = () => {
    const {labels, itens} = this.props;

    return (
      <Card>
        <CardTitle
          title={this.props.title}
        />
        <CardText>
          <Row around='xs'>
            <Col xs={6}>
              Taxas
            </Col>
            <Col xs={3}>
              Actual
            </Col>
            <Col xs={3}>
              Futuro
            </Col>
          </Row>
          {this.getSum(itens, labels)}
        </CardText>
      </Card>
    );
  }
}

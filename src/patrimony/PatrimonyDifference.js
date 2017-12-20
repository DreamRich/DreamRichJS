import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import formatCurrency from '../utils/currency';
import Divider from 'material-ui/Divider';
import MediaQuery from 'react-responsive';

export default class PatrimonyDifference extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  calcDiffer = () => {
    let value = 0;
    let differ = 0;
    if(this.props.data.endPatrimony && this.props.data.actualPatrimony) {
      value = this.props.data.endPatrimony - this.props.data.actualPatrimony;
      differ = this.props.data.endPatrimony / this.props.data.actualPatrimony;
    }
    return formatCurrency(value) + ' (' + this.toPorcent(differ) + ')';
  }

  calcDifferRate = () => {
    let value = 0;
    if(this.props.data.targetRate && this.props.data.actualRate) {
      value = this.props.data.targetRate / this.props.data.actualRate - 1;
    }
    return this.toPorcent(value);
  }

  toPorcent = (value) => (value ? (value*100).toFixed(2):'0.00' ) + ' %'

  render = () => {
    return <div>
      <MediaQuery key="desktop" query="(min-width: 1030px)">
        <Row>
          <Col xs={1} className="LabelPatrimony">
            Patrimônio
          </Col>
          <Col xs={4} className="LabelPatrimony">
            <label>Alvo R$</label><br /> {formatCurrency(this.props.data.endPatrimony)}
          </Col>
          <Col xs={4} className="LabelPatrimony">
            <label>Atual R$</label><br /> {formatCurrency(this.props.data.actualPatrimony)}
          </Col>
          <Col xs={3} className="LabelPatrimony">
            <label>Diferença de R$</label><br /> {this.calcDiffer()}
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col xs={1} className="LabelPatrimony">
            Rentabilidade
          </Col>
          <Col xs={4} className="LabelPatrimony">
            <label>Alvo</label><br /> {this.toPorcent(this.props.data.targetRate)}
          </Col>
          <Col xs={4} className="LabelPatrimony">
            <label>Atual</label><br /> {this.toPorcent(this.props.data.actualRate)}
          </Col>
          <Col xs={3} className="LabelPatrimony">
            <label>Diferença</label><br /> {this.calcDifferRate()}
          </Col>
        </Row>
      </MediaQuery>
      <MediaQuery key="mobile" query="(max-width: 1030px)">
        <Row>
          <Col xs={4} className="LabelPatrimony">
            <label>Alvo R$</label><br /> {formatCurrency(this.props.data.endPatrimony)}
          </Col>
          <Col xs={4} className="LabelPatrimony">
            <label>Atual R$</label><br /> {formatCurrency(this.props.data.actualPatrimony)}
          </Col>
          <Col xs={4} className="LabelPatrimony">
            <label>Diferença R$</label><br /> {this.calcDiffer()}
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col xs={4} className="LabelPatrimony">
            <label>Alvo</label><br /> {this.toPorcent(this.props.data.targetRate)}
          </Col>
          <Col xs={4} className="LabelPatrimony">
            <label>Atual</label><br /> {this.toPorcent(this.props.data.actualRate)}
          </Col>
          <Col xs={4} className="LabelPatrimony">
            <label>Diferença</label><br /> {this.calcDifferRate()}
          </Col>
        </Row>
      </MediaQuery>
    </div>;
  }
}

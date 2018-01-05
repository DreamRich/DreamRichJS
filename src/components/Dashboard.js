import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../stylesheet/RegisterForms.sass';





import { Row, Col } from 'react-flexbox-grid';
import MediaQuery from 'react-responsive';
import getDivider from '../utils/getDivider';

import _ from 'lodash';
import '../stylesheet/Dashboard.sass';

class Dashboard extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  }

  getItem = (item) => {
    const {size} = item.props;
    return (
      <Col xs={size}>
        {item}
      </Col>
    );
  }

  getDesktop = () => {
    let count = 0;
    const childrenArray = React.Children.toArray(this.props.children);

    const rows = _.reduce(childrenArray, (result, item) => {
      if(count+item.props.size>12) {
        result.push([]);
        result[result.length-1].push(this.getItem(item));
        count = item.props.size;
      } else {
        count += item.props.size;
        result[result.length-1].push(this.getItem(item));
      }
      return result;
    }, [[]]);

    const coisa = rows.map( (row, index) => <Row around='xs' className='dashboard-row' key={index}>
      {row.map( (col, idx) => React.cloneElement(col, { key: idx}))}

    </Row> );
    return coisa;
  }


  getMobile = () => {
    const childrenArray = React.Children.toArray(this.props.children);
    return childrenArray.map( (item, index) => {
      if (index) {
        return (
          <div key={index}>
            {getDivider()}
            {item}
          </div>
        );
      } else {
        return item;
      }
    });
  }

  render() {
    return (
      <div>
        <MediaQuery key="desktopClientForm" query="(min-width: 1030px)">
          {this.getDesktop()}
        </MediaQuery>
        <MediaQuery key="mobileClientForm" query="(max-width: 1030px)">
          {this.getMobile()}
        </MediaQuery>
      </div>
    );
  }
}

export default Dashboard;

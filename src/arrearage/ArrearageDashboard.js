import React, {Component} from 'react';
import ArrearageTable from './ArrearageTable';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {getData} from '../resources/Requests';
import PropTypes from 'prop-types';

class ArrearageDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrearageList: []
    };
  }

  static propTypes = {
    id: PropTypes.string,
    arrearageList: PropTypes.array.isRequired,
  }

  getRoute = () => {
    const url = `/api/patrimony/arrearage/${this.props.id}/patrimony_arrearage/`;
    return url;
  }

  componentWillMount = () => {
    getData(this.getRoute(), (data) => this.setState({arrearageList: data}));
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.id != nextProps.id){
      this.props = nextProps;
      getData(this.getRoute(), (data) => this.setState({arrearageList: data}));
    } else {
      return false;
    }
  }

  listArrearages = () => {
    const list = (this.state.arrearageList).map((arrearage, index) =>
      <Card key={index}>
        <CardHeader
          title={arrearage.name}
          subtitle={arrearage.value}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <ArrearageTable
            id={arrearage.id}
          />
        </CardText>
      </Card>
    );
    return list;
  }

  render() {
    return(
      <div>
        {this.listArrearages()}
      </div>
    );
  }

}

export default ArrearageDashboard;

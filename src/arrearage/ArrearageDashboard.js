import React, {Component} from 'react';
import ArrearageTable from './ArrearageTable';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import MediaQuery from 'react-responsive';
import {getData} from '../resources/Requests';
import PropTypes from 'prop-types';
import ArrearageMenu from './ArrearageMenu';
import Subtitle from '../components/Subtitle';
import { Row, Col } from 'react-flexbox-grid';
import Reply from 'material-ui/svg-icons/content/reply';
import IconButton from 'material-ui/IconButton';


class ArrearageDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrearageList: []
    };
  }

  static propTypes = {
    id: PropTypes.number,
    sizeDashboard: PropTypes.func,
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

  getMobile = () => {
    let list = (this.state.arrearageList).map((arrearage, index) =>
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
    if(list.length <= 0) {
      const styleSubtitle = {
        'font-size': '130%',
      };
      list = (
        <Subtitle
          label="Não há dívidas cadastradas"
          style={styleSubtitle}
        />
      );
    }
    return (
      <Card>
        <CardTitle
          title="Lista de dívidas"
        />
        <CardText>
          {list}
        </CardText>
      </Card>
    );
  }

  showTable = (id) => {
    this.props.sizeDashboard(12);
    console.log('oi', this.state.id);
    this.setState({id: id, open: true});
  }

  hideTable = () => {
    this.props.sizeDashboard(3);
    this.setState({ open:false, });
  }


  getDesktop = () => {
    return (<ArrearageMenu
      arrearageList={this.state.arrearageList}
      showTable={this.showTable}
    />);
  }

  render = () => {
    return(
      <div>
        <MediaQuery key="desktopArrearageDashboard" query="(min-width: 1030px)">
          <Row>
            <Col xs={this.state.open ? 3:12}>
              {this.getDesktop()}
            </Col>
            {this.state.open &&
              <Col xs={9}>
                <Card>
                  <CardTitle
                    title='Detalhe de parcelas da dívida'
                  />
                  <CardActions>
                    <IconButton onClick={this.hideTable} >
                      <Reply />
                    </IconButton>
                  </CardActions>
                  <CardText>
                    <ArrearageTable id={this.state.id} />
                  </CardText>
                </Card>
              </Col>
            }
          </Row>
        </MediaQuery>
        <MediaQuery key="mobileArrearageDashboard" query="(max-width: 1030px)">
          {this.getMobile()}
        </MediaQuery>
      </div>
    );
  }

}

export default ArrearageDashboard;

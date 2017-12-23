import React, {Component} from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import PropTypes from 'prop-types';
import Subtitle from '../components/Subtitle';


//const styleNestedMenuItem = {
//   width: '700px',
// };


class ArrearageMenu extends Component {

  static propTypes = {
    arrearageList: PropTypes.array,
    showTable: PropTypes.func,
  }

  getMenu = () => {
    let list = (this.props.arrearageList).map((arrearage, index) =>
      <MenuItem key={index}
        primaryText={arrearage.name}
        secondaryText={arrearage.value}
        rightIcon={<ArrowDropRight />}
        onClick={() => this.props.showTable(arrearage.id)}
      />
    );

    if(list.length <= 0) {
      const styleSubtitle = {
        fontSize: '130%',
      };
      list = (
        <Subtitle
          label="Não há dívidas cadastradas"
          style={styleSubtitle}
        />
      );
    }
    return(
      <Menu
        desktop={true}
        width={320}
        disableAutoFocus={true}
      >
        {list}
      </Menu>
    );
  }

  render = () => {
    return(
      <Card>
        <CardTitle
          title="Lista de dívidas"
        />
        <CardText>
          {this.getMenu()}
        </CardText>
      </Card>
    );
  }
}

export default ArrearageMenu;

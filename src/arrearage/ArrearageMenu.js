import React, {Component} from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import ArrearageTable from './ArrearageTable';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import PropTypes from 'prop-types';
import Subtitle from '../components/Subtitle';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

const styleNestedMenuItem = {
  width: '700px',
};


class ArrearageMenu extends Component {

  static propTypes = {
    arrearageList: PropTypes.array,
  }

  getMenu = () => {
    let list = (this.props.arrearageList).map((arrearage, index) =>
      <MenuItem key={index}
        primaryText={arrearage.name}
        secondaryText={arrearage.value}
        rightIcon={<ArrowDropRight />}
        menuItems={[
          <MenuItem
            key={index}
            innerDivStyle={styleNestedMenuItem}
            disabled={true}
          >
            <ArrearageTable
              id={arrearage.id}
            />
          </MenuItem>
        ]}
      />
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

  render() {
    return(
      <div>
        <Card style={style}>
          <CardTitle
            title="Lista de dívidas"
          />
          <CardText>
            {this.getMenu()}
          </CardText>
        </Card>
      </div>

    );
  }
}

export default ArrearageMenu;

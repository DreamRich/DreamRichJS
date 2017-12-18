import React, {Component} from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import ArrearageTable from './ArrearageTable';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import PropTypes from 'prop-types';

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
    const list = (this.props.arrearageList).map((arrearage, index) =>
      <MenuItem key={index}
        primaryText={arrearage.name}
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
    return(
      <Menu
        desktop={true}
        width={320}
        disableAutoFocus={true}
      >
        <Divider />
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

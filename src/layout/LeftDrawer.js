import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import {white} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';

const LeftDrawer = (props) => {
  let { navDrawerOpen } = props;

  const styles = {
    menuItem: {
      color: white,
      fontSize: 14
    }
  };

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}>
        <div>
          {props.menus.map((menu, index) =>
            <MenuItem
              key={index}
              style={styles.menuItem}
              primaryText={menu.text}
              leftIcon={menu.icon}
            />
          )}
        </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default LeftDrawer;

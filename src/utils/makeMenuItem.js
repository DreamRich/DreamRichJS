import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {AuthorizedLink} from '../routes/Router';

const noneUnderline = {
  textDecoration: 'none'
};

const  makeMenuItem = (permission, path, primaryText, leftIcon, className) => {
  const menuProps = (leftIcon ? {primaryText, leftIcon, className} : {primaryText, className});
  return (
    <List>
      <AuthorizedLink
        permission={permission}
        to={path}
        style={noneUnderline}>
        <ListItem
          {...menuProps}
        />
      </AuthorizedLink>
    </List>
  );
};

export default makeMenuItem;

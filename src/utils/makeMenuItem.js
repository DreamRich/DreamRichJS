import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import {AuthorizedLink} from '../routes/Router';


const noneUnderline = {
  textDecoration: 'none'
};

const  makeMenuItem = (permission,path,message,icon,styleText) => {
  return (
    <AuthorizedLink permission={permission} to={path} style={noneUnderline}>
      <MenuItem primaryText={message} style={styleText} leftIcon={icon} />
    </AuthorizedLink>
  );
};

export default makeMenuItem;

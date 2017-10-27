import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import {AuthorizedLink} from '../routes/Router';


const noneUnderline = {
  textDecoration: 'none'
};

const  makeMenuItem = (permission,path,primaryText,leftIcon,style, className) => {
  const menuProps = (leftIcon ? {primaryText, leftIcon, style, className} : {primaryText, style, className});
  return (
    <AuthorizedLink 
      permission={permission}
      to={path}
      style={noneUnderline}>
      <MenuItem 
        {...menuProps}
      />
    </AuthorizedLink>
  );
};

export default makeMenuItem;

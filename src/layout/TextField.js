import React from 'react';
import { TextField } from 'react-toolbox/lib/text_field';
import theme from '../stylesheet/TextFieldBorder.sass';

const TextFieldBorder = (props) => (
  <TextField {...props} theme={theme} />
);

export default TextFieldBorder;
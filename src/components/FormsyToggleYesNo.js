import React, {Component} from 'react';
import {FormsyCheckbox} from 'formsy-material-ui/lib';

export default class FormsyToggleYesNo extends Component {

  render = () => {
    return(
      <FormsyCheckbox
        {...this.props}
        checkedIcon={<div>SIM</div>}
        uncheckedIcon={<div>NÃO</div>}
      />
    );
  }
}

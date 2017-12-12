// http://www.material-ui.com/#/customization/colors
import {grey100} from 'material-ui/styles/colors';


// https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js
const button = {
  raisedButton: {
    color: grey100,
    //    primaryColor: '#00D0A7',
    //    primaryTextColor: '#fff',
  },
  //  flatButton: {
  //    primaryTextColor: '#00D0A7',
  //  },
};

const header = {
  //  appBar: {
  //    color: '#2E4155',
  //  },
  drawer: {
    color: '#394C65'
  },
};

const card = {
//  card: {
//    titleColor: '#636363',
//    subtitleColor: '#c7c7c7',
//  }
};

const palette = {
  palette: {
    primary1Color: '#394C65', //cyan500,
    //primary2Color: cyan700,
    //primary3Color: grey400,
    accent1Color: '#1FA0F3',
    //accent2Color: grey100,
    //accent3Color: grey500,
    //textColor: darkBlack,
    //secondaryTextColor: fade(darkBlack, 0.54),
    //alternateTextColor: white,
    //canvasColor: white,
    //borderColor: grey300,
    disabledColor: '#000000',
    //pickerHeaderColor: cyan500,
    //clockCircleColor: fade(darkBlack, 0.07),
    //shadowColor: fullBlack,
  }
};

var styles = {};

Object.assign(styles, button);
Object.assign(styles, header);
Object.assign(styles, card);
Object.assign(styles, palette);

export default styles;

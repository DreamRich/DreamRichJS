// https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js
const button = {
  raisedButton: {
    primaryColor: '#00D0A7',
    primaryTextColor: '#fff',
  },
  flatButton: {
    primaryTextColor: '#00D0A7',
  },
};
const header = {
  appBar: {
    color: '#2E4155',
  },
};

var styles = {};

Object.assign(styles, button);
Object.assign(styles, header);

export default styles;

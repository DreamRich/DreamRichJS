import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './stylesheet/theme';
import Checkbox from 'material-ui/Checkbox';

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
  <div>
  <Checkbox label="adsf" />
      <App />

  </div>
    </MuiThemeProvider>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
injectTapEventPlugin();

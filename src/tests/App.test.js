import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter} from 'react-router-dom';
import localStorageMock from './mock/localStorageMock';

global.localStorage = localStorageMock;

describe('<App />', () => {
  const component = <BrowserRouter>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>;

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(component, div);
  });
});

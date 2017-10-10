import React, { Component } from 'react';
import './stylesheet/App.sass';
import Routers from './routes/Routers';
import SidebarMenu from './layout/SidebarMenu';

// TODO: Make css in a extern file

class App extends Component {

  render = () => {
    const paddingLeftDrawerOpen = 236;
    const styles = {
      container: {
        paddingLeft: paddingLeftDrawerOpen
      }
    };
    return (
      <div className="App">
        <SidebarMenu />
        <div style={styles.container}>
          <Routers />
        </div>
      </div>
    );
  }
}

export default App;

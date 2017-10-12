import React, { Component } from 'react';
import './stylesheet/App.sass';
import Header from './layout/Header';
import SidebarMenu from './layout/SidebarMenu';
import PropTypes from 'prop-types';
import Routers from './routes/Routers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true
    };
  }

  handleChangeRequestNavDrawer = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  handleToggle = () => this.setState({open: !this.state.open})

  render = () => {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 250;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
        margin: navDrawerOpen ? '90px 20px 20px 15px' : '90px 5% 0px 8%'
      }
    };

    return (
      <div className="App">
        <div style={styles.container}>
          <Routers />
        </div>
        <Header styles={styles.header}
            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}
        />
        <SidebarMenu  navDrawerOpen={this.state.navDrawerOpen} />
      </div>
    );
  }
}

export default App;

App.propTypes = {
  width: PropTypes.array.isRequired,
};

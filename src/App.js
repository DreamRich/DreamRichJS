import React, { Component } from 'react';
import './stylesheet/App.sass';
//import SidebarMenu from './layout/SidebarMenu';
// TODO Make adjust of elemets in routers
//import Routers from './routes/Routers';
//<div style={styles.container}>
//  <Routers />
//</div>
// <SidebarMenu />

// New
import Header from './layout/Header';
import SidebarMenu from './layout/SidebarMenu';
import {SMALL, LARGE} from 'material-ui/utils/withWidth';
import PropTypes from 'prop-types';
import Routers from './routes/Routers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
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
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };
    return (
      <div className="App">
        <div className="conteiner" style={styles.container}>
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

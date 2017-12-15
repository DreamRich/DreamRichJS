import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoalStore from '../stores/GoalStore';
import '../stylesheet/RegisterForms.sass';
import Dashboard from '../components/Dashboard';
import {getGoalTypes} from '../resources/getFormData';
import GoalRegister from '../goal/GoalRegister';
import GoalChart from '../goal/GoalChart';

class GoalDashboard extends Component {

  static propTypes = {
    id: PropTypes.number,
  }

  state = GoalStore.getState()

  componentWillMount = () => {
    this.setState({
      listener: GoalStore.addListener(this.handleChange)
    });
    getGoalTypes();
  }

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState(GoalStore.getState())

  render() {
    const {id, ...rest} = this.props;
    return (
      <Dashboard>
        <GoalChart size={12} id={id} {...rest} />
        <GoalRegister size={12} />
      </Dashboard>
    );
  }
}

export default GoalDashboard;

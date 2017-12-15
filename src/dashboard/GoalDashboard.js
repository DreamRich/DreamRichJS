import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoalStore from '../stores/GoalStore';
import '../stylesheet/RegisterForms.sass';
import Dashboard from '../components/Dashboard';
import {getGoalTypes} from '../resources/getFormData';
import GoalForm from '../goal/form/GoalForm';
import GoalChart from '../goal/GoalChart';

class GoalDashboard extends Component {

  static propTypes = {
    id: PropTypes.string,
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
    return (
      <Dashboard>
        <GoalChart size={12} id={this.props.id} />
        <GoalForm size={12} />
      </Dashboard>
    );
  }
}

export default GoalDashboard;

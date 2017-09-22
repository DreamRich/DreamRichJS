import React, {Component} from 'react';
import {getData} from '../resources/Requests';
import {goalRouters} from '../routes/RouteMap';

export default class GoalChart extends Component {

  constructor(props){
    super(props);
    this.state = {data: {goals_flow_dic: []}};
  }

  componentWillMount(){
    getData(goalRouters['goals_flow_dic'], this, 'data');
  }

  render() {
    console.log(this.state.data);
    const k = this.state.data.goals_flow_dic.map((e, k) => <div key={k}>{e.name}</div>);
    return (
      <div>
        {k}
      </div>
    );
  }
}

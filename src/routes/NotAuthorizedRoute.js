import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class NotAuthorizedRoute extends Component{
  render() {
    return (
      <div>
        <h2>401 Resource not authorized</h2>
        O recurso que você está entando buscar necessita de auteticação!
      <br />
        <Link to="/login">Login page</Link>
      </div>
    );
  }
}

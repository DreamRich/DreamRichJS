import {Auth} from '../auth/Auth';

const getData = (url, component, field) => {
  console.log(field);
  fetch(url, {
    method: 'get',
    headers: Auth.getHeader(),
  })
  .then((response) => response.json() )
  .then((data) => {component.setState({[field]: data});})
  .catch((error) => {console.log(error);});
};

export default getData;

import {Auth} from '../auth/Auth';

const getData = (url, component, field, fieldB) => {
  console.log(field);
  fetch(url, {
    method: 'get',
    headers: Auth.getHeader(),
  })
  .then((response) => response.json() )
  .then((data) => {
    component.setState({[field]: data});
    if (fieldB !== undefined) component.setState({[fieldB]: data});
  })
  .catch((error) => {console.log(error);});
};

export default getData;

import {Auth} from '../auth/Auth';

const getHeader = (additional={}) => {
  let header;
  if (additional !== undefined && additional !== null){
    header = additional;
  }
  header['Accept'] = 'application/json';
  header['Content-type'] = 'application/json';
  return header;
};

const getAuthenticatedHeader = (additional={}) => {
  const header = getHeader(additional);
  header['Authorization'] = 'Token ' + Auth.getAuth();
};

const methods = {
  POST: 'post',
  GET: 'get',
};

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

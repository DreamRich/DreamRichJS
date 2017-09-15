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

export {getHeader, getAuthenticatedHeader, methods};

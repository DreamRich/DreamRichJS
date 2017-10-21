import {methods, getAuthenticatedHeader} from './Headers';
import {Auth} from '../auth/Auth';

const noneFunction = () => {}; //Design for none object

const request = (url, meta, handleData=noneFunction, handleOk=noneFunction, handleFail=noneFunction) => {
  fetch(url, meta)
    .then((response) => {
      if(response.ok){
        handleOk(response);
        return response.json();
      } else if( response.status === 401) {
        handleFail(response);
        return response.json();
      } else {
        handleFail(response);
        throw new Error(`Request error status ${response.status}`);
      }
    })
    .then((data) => {
      if (data.detail === 'Signature has expired.' 
        || data.detail === 'Invalid signature.'){
        alert('Sua sessão expirou!');
        Auth.deauthenticate();
        window.location.replace('/login');
      } else {
        handleData(data);
      }
    })
    .catch((error) => {console.error(error);});
};

const getData = (url, component, field, fieldB) => {
  request(url, {
    method: methods.GET,
    headers: getAuthenticatedHeader(),
  }, (data) => {
    component.setState({[field]: data});
    if (fieldB !== undefined) component.setState({[fieldB]: data});
  });
};

const getDataReal = (url, handleData=noneFunction) => {
  request(url, {
    method: methods.GET,
    headers: getAuthenticatedHeader(),
  }, handleData);
};

const postData = (url, data, handleData=noneFunction, handleFail=noneFunction) => {
  request(url,
    {
      method: methods.POST,
      headers: getAuthenticatedHeader(),
      body: JSON.stringify(data),
    },
    handleData,
    noneFunction,
    (response) => {
      handleFail(response);
    });
};

const putData = (url, data, handleData=noneFunction) => {
  request(url, {
    method: methods.PUT,
    headers: getAuthenticatedHeader(),
    body: JSON.stringify(data),
  }, handleData);
};

const deleteData = (url, handleOk) => {
  request(url, {
    method: methods.DELETE,
    headers: getAuthenticatedHeader()
  }, noneFunction,
  handleOk
  );
};

export {getData, postData, putData, deleteData, getDataReal};

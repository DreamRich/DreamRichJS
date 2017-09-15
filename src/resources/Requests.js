import {methods, getAuthenticatedHeader} from './Headers';

const getData = (url, component, field, fieldB) => {
  fetch(url, {
    method: methods.GET,
    headers: getAuthenticatedHeader(),
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    } else {
      throw new Error(`Request error status ${response.status}`);
    }
  })
  .then((data) => {
    component.setState({[field]: data});
    if (fieldB !== undefined) component.setState({[fieldB]: data});
  })
  .catch((error) => {console.log(error);});
};

const postData = (url, data, handleData, handleFail) => {
  fetch(url, {
    method: methods.POST,
    headers: getAuthenticatedHeader(),
    body: JSON.stringify(data),
  })
    .then((response) => {
      if(response.ok) {
        console.log(url + ' was submitted');
        return response.json();
      } else {
        handleFail(response);
        throw new Error (`Response error ${response.status}: `+
          `${url} could not be submitted`);
      }
    })
    .then(handleData)
    .catch((error) => {
      console.error(error);
    });
};

export {getData, postData};

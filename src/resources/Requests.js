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

const postData = (url, component, data) => {
  fetch(routeMap[this.name], {
    method: methods.POST,
    headers: getAuthenticatedHeader(),
    body: JSON.stringify(data),
  })
    .then((response) => {
      if(response.ok) {
        console.log(this.name + ' was submitted');
      } else {
        throw new Error (this.name + ' could not be submitted');
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export default getData;

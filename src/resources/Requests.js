import {methods, getAuthenticatedHeader} from './Headers';
import {Auth} from '../auth/Auth';
import AppDispatch from '../AppDispatcher';
import ActionType from '../actions/ActionType';

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
      } else {
        handleData(data);
      }
    })
    .catch((error) => {console.error(error);});
};

const getData = (url, handleData=noneFunction, handleOk=noneFunction, handleFail=noneFunction, requireAuthentication=true) => {
  var meta;
  if(requireAuthentication){
    meta = {
      method: methods.GET,
      headers: getAuthenticatedHeader()
    };
  } else {
    meta = {
      method: methods.GET
    };
  }
  request(
    url,
    meta,
    handleData,
    handleOk,
    handleFail);
};

const postData = (url, data, handleData=noneFunction, handleFail=noneFunction, handleOk=noneFunction) => {
  request(
    url,
    {
      method: methods.POST,
      headers: getAuthenticatedHeader(),
      body: JSON.stringify(data),
    },
    handleData,
    (response) => {
      handleOk(response);
    },
    (response) => {
      handleFail(response);
    }
  );
};

const postFormData = (url, data, handleData=noneFunction, handleFail=noneFunction, handleOk=noneFunction) => {
  postData(url,
    data,
    handleData,
    (response) => {
      handleFail(response);
      AppDispatch.dispatch({action: ActionType.USERFEEDBACK, message: 'Erro ao salvar!'});
    },
    (response) => {
      handleOk(response);
      AppDispatch.dispatch({action: ActionType.USERFEEDBACK, message: 'Salvo com sucesso!'});
    }
  );
};

const putFormData = (url, data, handleData=noneFunction, handleFail=noneFunction, handleOk=noneFunction) => {
  request(url, {
    method: methods.PUT,
    headers: getAuthenticatedHeader(),
    body: JSON.stringify(data),
  },
  handleData,
  (response) => {
    handleFail(response);
    AppDispatch.dispatch({action: ActionType.USERFEEDBACK, message: 'Erro ao salvar!'});
  },
  (response) => {
    handleOk(response);
    AppDispatch.dispatch({action: ActionType.USERFEEDBACK, message: 'Salvo com sucesso!'});
  });
};

const putData = (url, data, handleData=noneFunction,  handleFail=noneFunction, handleOk=noneFunction) => {
  request(url, {
    method: methods.PUT,
    headers: getAuthenticatedHeader(),
    body: JSON.stringify(data),
  },
  handleData,
  (response) => {
    handleFail(response);
  },
  (response) => {
    handleOk(response);
  });
};

const deleteData = (url, handleOk) => {
  request(url, {
    method: methods.DELETE,
    headers: getAuthenticatedHeader()
  }, noneFunction,
  handleOk
  );
};

const postOrPutStrategy = (actualData, url, data,
  handleData=noneFunction, handleFail=noneFunction,
  handleOk=noneFunction) => {
  if (actualData) {
    const id = actualData.id;

    if (!id){
      postFormData(url, data, handleData, handleFail, handleOk);
    } else {
      putFormData(`${url}${id}/`, data, handleData, handleFail, handleOk);
    }
  } else {
    postFormData(url, data, handleData, handleFail, handleOk);
  }
};

export {postOrPutStrategy, getData, postData, putData, deleteData, postFormData};

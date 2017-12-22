import React from 'react';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import { Col } from 'react-flexbox-grid';

Formsy.addValidationRule('isValidCPF', (values) => {
  var soma = 0;
  var resto;
  var inputCPF = values.cpf;

  if(values.cpf != undefined && values.cpf!=''){
    if(inputCPF == '00000000000'){
      return false;
    }
    for(var i=1; i<=9; i++){
      soma = soma + parseInt(inputCPF.substring(i-1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)){
      resto = 0;
    }

    if(resto != parseInt(inputCPF.substring(9, 10))){
      return false;
    }

    soma = 0;
    for(var j = 1; j <= 10; j++){
      soma = soma + parseInt(inputCPF.substring(j-1, j))*(12-j);
    }
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)){
      resto = 0;
    }
    if(resto != parseInt(inputCPF.substring(10, 11))){
      return false;
    }
    return true;
  }
  return true;
});

const makeFormysTextList = (fieldList, textKey, data, isDisable) => {
  const formsyTextList = fieldList.map((field, index) => {
    const fieldValue = (data !== undefined ? data[field.name] : field.value);
    field.isUpdate = field.isUpdate == true ? true : false;
    return (
      <Col key={index+'column'} xs>
        <FormsyText
          className={isDisable? 'disabled':''}
          name={field.name}
          validations={field.validations}
          validationErrors={field.validationErrors}
          hintText={field.hintText}
          floatingLabelText={field.floatingLabelText}
          value={fieldValue}
          updateImmediately={field.isUpdate}
          key={textKey+index}
          fullWidth={true}
        />
      </Col>
    );
  });

  return formsyTextList;
};

export default makeFormysTextList;

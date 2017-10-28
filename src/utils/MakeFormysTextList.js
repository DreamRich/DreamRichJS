import React from 'react';
import {FormsyText} from 'formsy-material-ui/lib';

const makeFormysTextList = (fieldList, textKey, data) => {
  const formsyTextList = fieldList.map((field, index) => {
    const fieldValue = (data !== undefined ? data[field.name] : field.value);
    return (
      <FormsyText
        name={field.name}
        validations={field.validations}
        validationError={field.validationError}
        hintText={field.hintText}
        floatingLabelText={field.floatingLabelText}
        value={fieldValue}
        //updateImmediately={field.isUpdate}
        key={textKey+index}
      />
    );
  });

  return formsyTextList;
};

export default makeFormysTextList;

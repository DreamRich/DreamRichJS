import React from 'react';
import {FormsyText} from 'formsy-material-ui/lib';
import { Col } from 'react-flexbox-grid';

const makeFormysTextList = (fieldList, textKey, data) => {
  const formsyTextList = fieldList.map((field, index) => {
    const fieldValue = (data !== undefined ? data[field.name] : field.value);
    return (
      <Col key={index+'column'} xs>
        <FormsyText
          name={field.name}
          validations={field.validations}
          validationError={field.validationError}
          hintText={field.hintText}
          floatingLabelText={field.floatingLabelText}
          value={fieldValue}
          updateImmediately={field.isUpdate}
          key={textKey+index}
          disabled={field.disable}
        />
      </Col>
    );
  });

  return formsyTextList;
};

export default makeFormysTextList;

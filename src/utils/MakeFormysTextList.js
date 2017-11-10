import React from 'react';
import {FormsyText} from 'formsy-material-ui/lib';
import { Col } from 'react-flexbox-grid';

const makeFormysTextList = (fieldList, textKey, data, isDisable) => {
  const formsyTextList = fieldList.map((field, index) => {
    const fieldValue = (data !== undefined ? data[field.name] : field.value);
    return (
      <Col key={index+'column'} xs>
        <FormsyText
          className={isDisable? 'disabled':''}
          name={field.name}
          validations={field.validations}
          validationError={field.validationError}
          hintText={field.hintText}
          floatingLabelText={field.floatingLabelText}
          value={fieldValue}
          updateImmediately={field.isUpdate}
          key={textKey+index}
          disabled={isDisable}
          fullWidth={true}
        />
      </Col>
    );
  });

  return formsyTextList;
};

export default makeFormysTextList;

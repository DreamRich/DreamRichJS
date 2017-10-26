import React from 'react';
import {FormsyText} from 'formsy-material-ui/lib';

const makeFormysTextList = (dataList, textKey) => {
  let formsyTextList = dataList.map((data,index)=>{
    return (
      <FormsyText
        name={data.name}
        validations={data.validations}
        validationError={data.validationError}
        hintText={data.hintText}
        floatingLabelText={data.floatingLabelText}
        value={data.value}
        updateImmediately={data.isUpdate}
        key={textKey+index}
      />
    );
  });

  return formsyTextList;
};

export default makeFormysTextList;

import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const getSelectOption = (selectOption, isChecked, labelOption) => {
  return (
    <Checkbox
      label={labelOption}
      checked={isChecked}
      onClick={selectOption}
      style={{margin: '30px 0px 30px 0px'}}
    />
  );
};

export default getSelectOption;

import _ from 'underscore';

const getLastIndex = (arr) => {
  const item = _.max(arr, (item) => item.index);
  let index = 0;
  if (item.index) {
    index = item.index;
  }
  return index;
};

export default getLastIndex;

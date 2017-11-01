import _ from 'underscore';

const getLastIndex = (arr) => {
  const index = _.max(arr, (item) => item.index);
  return (index < 0 ? 0 : index);
};

export default getLastIndex;

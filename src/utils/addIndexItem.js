const addIndex = (item) => {
  item.index = item.id;
  return item;
};

export default addIndex;

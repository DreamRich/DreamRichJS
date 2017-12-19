const formatCurrency = (value) => {
  if(value) {
    let strValue = String(value.toFixed(2)); // round to 2 decimal
    strValue = strValue.replace(/\./g, ','); // replace the . with ,
    strValue = strValue.replace(/(\d)(?=(\d{3})+,)/g, '$1.'); // match groups of 3 numbers and replace it with a point
    return strValue;
  }
  return '0,00';
};

export default formatCurrency;

const urls = {
  client: '/api/client/',
  address: '/api/client/address/',
  state: '/api/client/state/',
  country: '/api/client/country/',
  bank_account: '/api/client/bank-account/',
  dependent: '/api/client/dependents/',
  active_client: '/api/client/active/',
};

const valid_formats = ['json', 'html', 'xml'];

// Param format refers to the data format from request. Ex: .json
function getUrlFormatted(route, format){
  if(valid_formats.includes(format)){
    let formated_value = `${urls[route].slice(0, -1)}.${format}/`;
    urls[route] = formated_value;
  } else {
    let invalid_format = new Error();

    invalid_format.name = 'Invalid format';
    invalid_format.message = `The format ${format} is not a valid format.`;

    throw invalid_format;
  }

  return urls[route];
}

function checkRoute(route){
  if(route in urls){
    // OK
  } else {
    let invalid_route = new Error();

    invalid_route.name = 'Invalid input';
    invalid_route.message = 'There isn\'t a registered url for this route.';

    throw invalid_route;
  }
}

// Param format refers to the data format from request. Ex: .json
const getUrl = (route, format='') => {
  try {
    checkRoute(route);
  } catch(err){
    console.error(`Couldn't get url for '${route}' route. ${err.message}`); 
  }

  var url = '';

  if(format.length > 0){
    try {
      url = getUrlFormatted(route, format);
    } catch(err){
      console.error(`Couldn't get url for '${route}' route. ${err.message}`); 
    }
  } else {
    url = urls[route];
  }

  return url;
};

export { getUrl };

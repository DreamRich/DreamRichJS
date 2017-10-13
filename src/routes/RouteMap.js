const routeMap = {
  client: '/api/client/',
  address: '/api/client/address/',
  state: '/api/client/state/',
  country: '/api/client/country/',
  bank_account: '/api/client/bank-account/',
  dependent: '/api/client/dependent/',
  active_client: '/api/client/active/',
  regular_cost: '/api/financial_planning/regularcost/',
};

const goalRouters = {
  goals_flow_dic:  '/api/goal/dic/1/',
};

const valid_formats = ['json', 'html', 'xml'];

// Param format refers to the data format from request. Ex: .json
function getUrlWithFormat(route, format){
  var url;

  if(valid_formats.includes(format)){
    let formatted_url = `${routeMap[route].slice(0, -1)}.${format}/`;
    url = formatted_url;
  } else {
    let invalid_format = new Error();

    invalid_format.name = 'Invalid format';
    invalid_format.message = `The format ${format} is not a valid format.`;

    throw invalid_format;
  }

  return url;
}

function checkRoute(route){
  if(route in routeMap){
    // OK
  } else {
    let invalid_route = new Error();

    invalid_route.name = 'Invalid input';
    invalid_route.message = 'There isn\'t a registered url for this route.';

    throw invalid_route;
  }
}

// Param format refers to the data format from request. Ex: .json
function getUrl(route, format=''){
  try {
    checkRoute(route);
  } catch(err){
    console.error(`Couldn't get url for '${route}' route. ${err.message}`); 
  }

  var url = '';

  if(format.length > 0){
    try {
      url = getUrlWithFormat(route, format);
    } catch(err){
      console.error(`Couldn't get url for '${route}' route. ${err.message}`); 
    }
  } else {
    url = routeMap[route];
  }

  return url;
}


export {getUrl, routeMap, goalRouters};

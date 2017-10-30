const routeMap = {
  active_client: '/api/client/active/',
  sponse: '/api/client/',
  address: '/api/client/address/',
  bank_account: '/api/client/bank-account/',
  country: '/api/client/country/',
  dependent: '/api/client/dependent/',
  goal: '/api/goal/goal/',
  goal_manager: '/api/goal/goal_manager/',
  goal_type: '/api/goal/goal_type/',
  cost_type: '/api/financial_planning/cost_type/',
  regular_cost: '/api/financial_planning/regular_cost/',
  cost_manager: '/api/financial_planning/cost_manager/',
  state: '/api/client/state/',
  goals_flow_dic:  '/api/goal/goal_manager/1/',
  patrimony: '/api/patrimony/',
  active: '/api/patrimony/active/',
  active_manager: '/api/patrimony/active_manager/',
  active_type: '/api/patrimony/active_type/',
  realestate: '/api/patrimony/realestate/',
  income: '/api/patrimony/income/',
  company: '/api/patrimony/companyparticipation/',
  equipament: '/api/patrimony/equipment/',
  address_type: '/api/client/address/type_of_address/',
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

  if(format && format.length > 0){
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


export {getUrl, routeMap};

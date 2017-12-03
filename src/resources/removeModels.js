import {deleteData} from './Requests';
import {routeMap} from '../routes/RouteMap';

const removeClient = (items, key) => removeFromList(routeMap.dependent, items, key);

const removeRegularCost = (items, key) => removeFromList(routeMap.regular_cost, items, key);

const removeGoal = (items, key) => removeFromList(routeMap.goal, items, key);

const removePatrimony = (patrimony, items, key) => removeFromList(routeMap[patrimony], items, key);
const removeFromList = (route, items, key) => {
  const item = items.find( item => item.index === key);
  deleteData(`${route}${item.id}/`);
  return items.filter( item => item.index !== key);
};

export {removeClient, removeRegularCost, removeGoal, removePatrimony};

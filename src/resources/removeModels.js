import {deleteData} from './Requests';
import {routeMap} from '../routes/RouteMap';

const removeClient = (items, key, remove) => removeFromList(routeMap.dependent, items, key, remove);

const removeRegularCost = (cost, items, key, remove) => removeFromList(routeMap[cost], items, key, remove);

const removeGoal = (items, key, remove) => removeFromList(routeMap.goal, items, key, remove);

const removePatrimony = (patrimony, items, key, remove) => removeFromList(routeMap[patrimony], items, key, remove);

// Remove or only cancel the edit in row
const removeFromList = (route, items, key, remove) => {
  const item = items.find( item => item.index === key);
  if (remove) { // only items with ID can be removed
    deleteData(`${route}${item.id}/`);
    return items.filter( item => item.index !== key);
  } else if (item.id) { // back item to previous state
    return items.map( item => {
      if (item.index === key) {
        item.selected = false;
      }
      return item;
    });
  } else { // is a row not persisted, only remove it
    return items.filter( item => item.index !== key);
  }
};

export {removeClient, removeRegularCost, removeGoal, removePatrimony};

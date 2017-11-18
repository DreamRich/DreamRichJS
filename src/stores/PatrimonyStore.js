'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {/*postData,*/ postOrPutStrategy} from '../resources/Requests';
import ActionType from '../actions/ActionType';
//import {routeMap} from '../routes/RouteMap';
import getLastIndex from '../utils/getLastIndex';
import addIndex from '../utils/addIndexItem';

class PatrimonyStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      patrimony: {},
      canSubmit: false,
      stepIndex: 0,
      incomes: [{index: 0, selected: false}],
      realestates: [{index: 0, selected: false}],
      companyparticipations: [{index: 0, selected: false}],
      arrearanges: [{index: 0, selected: false}],
      equipments: [{index: 0, selected: false}],
      types: [],
      actives: [{index: 0, selected: false}],
      activemanager: {},
    };
  }

  reduce = (state, action) => {
    let arr;
    let item;
    switch (action.action) {

    case ActionType.PATRIMONY.GETFORMSUCCESS:
      return {...state, ...this.getPatrimonyData(action.data)};

    case ActionType.PATRIMONY.SUBMIT:
      return {...state, canSubmit: action.canSubmit};

    case ActionType.PATRIMONY.POSTFORM:
      postOrPutStrategy(
        state[action.state],
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.PATRIMONY.POSTFORMSUCCESS,
            data: data,
            state: action.state
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.PATRIMONY.POSTFORMSUCCESS:
      return {...state,
        [action.state]: action.data,
        stepIndex: state.stepIndex + 1};

    case ActionType.PATRIMONY.MANAGERSUCCESS:
      return {...state, activemanager: action.data};

    case ActionType.PATRIMONY.POSTMULTIFORM:
      item = state[action.state].find( item => item.index === action.key);
      postOrPutStrategy(
        item,
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.PATRIMONY.POSTMULTIFORMSUCCESS,
            data: data,
            state: action.state,
            key: action.key
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.PATRIMONY.POSTMULTIFORMSUCCESS:
      state[action.state].find( (item, index) => {
        if (item.index === action.key){
          action.data.index = action.key;
          state[action.state][index] = action.data; // same state.incomes[idx]
          return true;
        }
      });
      return {...state};

    case ActionType.RESETFORMSTORES:
      return {...state, patrimony: {}};

    case ActionType.PATRIMONY.SETSTEP:
      return {...state, stepIndex: action.stepIndex};

    case ActionType.PATRIMONY.SELECT:
      state[action.state].find( item => {
        if (item.index === action.key) {
          item.selected = !item.selected;
          return true;
        }
      });
      return {...state};

    case ActionType.PATRIMONY.ADD:
      arr = state[action.state].slice();
      arr.push({index: getLastIndex(arr) + 1,
        selected: true
      });
      return {...state, [action.state]: arr};

    case ActionType.PATRIMONY.REMOVE:
      arr = state[action.state].filter( item => item.index !== action.key );
      return {...state, [action.state]: arr};

    case ActionType.PATRIMONY.TYPESUCCESS:
      return {...state, types: action.types};

    default:
      return state;
    }
  }

  getPatrimonyData = (data) => {
    const arrays = ['incomes', 'realestates', 'equipments',
      'companyparticipations', 'arrearanges'];

    /* Create a new object with keys in arrays and add the index
     * in each object to render correctly in forms
    */
    const newState = {};
    arrays.forEach( item => {
      if (data[item]) {
        newState[item] = data[item].map(addIndex);
      }
      delete data[item];
    });

    newState.activemanager = data.activemanager || {actives: []};
    newState.actives = newState.activemanager.actives.map(addIndex);
    delete newState.activemanager['actives'];
    delete data['activemanager'];
    newState.patrimony = data;
    return newState;

  }

}

export default new PatrimonyStore();
